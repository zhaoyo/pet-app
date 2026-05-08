import { useEffect, useState, useRef, useCallback } from 'react';
import { roomApi } from '../api/roomApi';
import { inventoryApi } from '../api/shopApi';
import { usePetStore } from '../store/petStore';
import RoomBackground from '../components/room/RoomBackground';
import type { RoomItem, ShopItem } from '../types/api';

export default function RoomPage() {
  const { activePet } = usePetStore();
  const [layout, setLayout] = useState<RoomItem[]>([]);
  const [furniture, setFurniture] = useState<ShopItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!activePet) return;
    roomApi.get(activePet.id).then(r => setLayout(r.data));
    inventoryApi.getAll().then(r => {
      setFurniture(r.data.filter(i => i.category === 'furniture'));
    });
  }, [activePet?.id]);

  const debouncedSave = useCallback((newLayout: RoomItem[]) => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      if (!activePet) return;
      await roomApi.save(activePet.id, newLayout.map(({ item: _, ...rest }) => rest as RoomItem));
    }, 1500);
  }, [activePet?.id]);

  const handleAddFurniture = (item: ShopItem) => {
    const existing = layout.find(l => l.item_id === item.id);
    if (existing) return;
    const newItem: RoomItem = {
      item_id: item.id,
      x: 50 + Math.random() * 200,
      y: 100 + Math.random() * 150,
      z_index: layout.length + 1,
      item,
    };
    const newLayout = [...layout, newItem];
    setLayout(newLayout);
    debouncedSave(newLayout);
  };

  const handleRemove = (item_id: number) => {
    const newLayout = layout.filter(l => l.item_id !== item_id);
    setLayout(newLayout);
    debouncedSave(newLayout);
  };

  const handleDragStart = (_e: React.MouseEvent | React.TouchEvent, item_id: number) => {
    setDragging(item_id);
  };

  const handleDrag = useCallback((e: MouseEvent | TouchEvent) => {
    if (dragging === null || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - 30;
    const y = clientY - rect.top - 30;
    setLayout(prev => prev.map(l => l.item_id === dragging ? { ...l, x, y } : l));
  }, [dragging]);

  const handleDragEnd = useCallback(() => {
    if (dragging !== null) {
      setDragging(null);
      setLayout(prev => {
        debouncedSave(prev);
        return prev;
      });
    }
  }, [dragging, debouncedSave]);

  useEffect(() => {
    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleDrag, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleDrag);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);

  const handleManualSave = async () => {
    if (!activePet) return;
    setSaving(true);
    await roomApi.save(activePet.id, layout.map(({ item: _, ...rest }) => rest as RoomItem));
    setSaving(false);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-700">🏡 宠物的房间</h1>
        <button
          onClick={handleManualSave}
          disabled={saving}
          className="px-4 py-2 bg-pink-400 text-white text-sm rounded-xl"
        >
          {saving ? '保存中...' : '💾 保存'}
        </button>
      </div>

      {/* Room canvas */}
      <div
        ref={canvasRef}
        className="relative rounded-2xl shadow-inner mb-4 overflow-hidden select-none"
        style={{ height: 280, userSelect: 'none' }}
      >
        {/* 2D room background */}
        <div className="absolute inset-0 z-0">
          <RoomBackground />
        </div>

        {layout.map(item => (
          <div
            key={item.item_id}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              zIndex: item.z_index + 1,
              cursor: dragging === item.item_id ? 'grabbing' : 'grab',
            }}
            onMouseDown={(e) => handleDragStart(e, item.item_id)}
            onTouchStart={(e) => handleDragStart(e, item.item_id)}
          >
            {item.item?.thumbnail ? (
              <img src={item.item.thumbnail} className="w-16 h-16 object-contain pointer-events-none" alt="" />
            ) : (
              <div className="w-16 h-16 bg-white/80 rounded-xl flex items-center justify-center text-2xl">🪑</div>
            )}
            <button
              onMouseDown={e => { e.stopPropagation(); handleRemove(item.item_id); }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-400 text-white rounded-full text-xs flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Furniture picker */}
      <h2 className="text-sm font-bold text-gray-600 mb-2">🛋️ 我的家具</h2>
      {furniture.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-4">还没有家具，去商店购买吧！</p>
      ) : (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {furniture.map(item => {
            const placed = layout.some(l => l.item_id === item.id);
            return (
              <button
                key={item.id}
                onClick={() => !placed && handleAddFurniture(item)}
                disabled={placed}
                className={`flex-shrink-0 flex flex-col items-center p-2 bg-white rounded-xl w-20 ${
                  placed ? 'opacity-40' : 'hover:shadow-md active:scale-95 transition-all'
                }`}
              >
                {item.thumbnail ? (
                  <img src={item.thumbnail} className="w-12 h-12 object-contain" alt={item.name} />
                ) : (
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-xl">🪑</div>
                )}
                <span className="text-xs text-gray-600 mt-1 truncate w-full text-center">{item.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
