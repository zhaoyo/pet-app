#!/usr/bin/env python3
"""Download Charmander (#4) and Squirtle (#7) sprites from PokeAPI CDN,
mirroring the directory structure of the existing pikachu/ folder."""

import os
import urllib.request

BASE_PUBLIC = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public')

SPRITES_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

POKEMON = [
    {'name': 'charmander', 'num': 4},
    {'name': 'squirtle',   'num': 7},
]

def download(url: str, dest: str):
    if os.path.exists(dest):
        print(f'  skip  {dest}')
        return
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    try:
        urllib.request.urlretrieve(url, dest)
        print(f'  ok    {dest}')
    except Exception as e:
        print(f'  FAIL  {url} -> {e}')

for p in POKEMON:
    n = p['num']
    name = p['name']
    root = os.path.join(BASE_PUBLIC, name)

    # Mirrors the exact file paths used in pikachuCards.ts, replacing 25 with the pokemon number.
    files = [
        # ── Rarity 1: generation sprites ──────────────────────────────────
        (f'versions/generation-i/red-blue/{n}.png',
         f'{SPRITES_BASE}/versions/generation-i/red-blue/{n}.png'),
        (f'versions/generation-i/yellow/{n}.png',
         f'{SPRITES_BASE}/versions/generation-i/yellow/{n}.png'),
        (f'versions/generation-ii/gold/{n}.png',
         f'{SPRITES_BASE}/versions/generation-ii/gold/{n}.png'),
        (f'versions/generation-ii/silver/{n}.png',
         f'{SPRITES_BASE}/versions/generation-ii/silver/{n}.png'),
        (f'versions/generation-ii/crystal/{n}.png',
         f'{SPRITES_BASE}/versions/generation-ii/crystal/{n}.png'),
        (f'versions/generation-iii/ruby-sapphire/{n}.png',
         f'{SPRITES_BASE}/versions/generation-iii/ruby-sapphire/{n}.png'),
        (f'versions/generation-iii/emerald/{n}.png',
         f'{SPRITES_BASE}/versions/generation-iii/emerald/{n}.png'),
        (f'versions/generation-iii/firered-leafgreen/{n}.png',
         f'{SPRITES_BASE}/versions/generation-iii/firered-leafgreen/{n}.png'),
        (f'versions/generation-iv/diamond-pearl/{n}.png',
         f'{SPRITES_BASE}/versions/generation-iv/diamond-pearl/{n}.png'),
        (f'versions/generation-iv/platinum/{n}.png',
         f'{SPRITES_BASE}/versions/generation-iv/platinum/{n}.png'),
        (f'versions/generation-v/black-white/{n}.png',
         f'{SPRITES_BASE}/versions/generation-v/black-white/{n}.png'),
        (f'versions/generation-vi/x-y/{n}.png',
         f'{SPRITES_BASE}/versions/generation-vi/x-y/{n}.png'),
        (f'versions/generation-vii/ultra-sun-ultra-moon/{n}.png',
         f'{SPRITES_BASE}/versions/generation-vii/ultra-sun-ultra-moon/{n}.png'),
        (f'versions/generation-viii/brilliant-diamond-shining-pearl/{n}.png',
         f'{SPRITES_BASE}/versions/generation-viii/brilliant-diamond-shining-pearl/{n}.png'),
        (f'versions/generation-ix/scarlet-violet/{n}.png',
         f'{SPRITES_BASE}/versions/generation-ix/scarlet-violet/{n}.png'),

        # ── Rarity 2: animated GIFs ────────────────────────────────────────
        (f'versions/generation-v/black-white/animated/{n}.gif',
         f'{SPRITES_BASE}/versions/generation-v/black-white/animated/{n}.gif'),
        (f'versions/generation-v/black-white/animated/female/{n}.gif',
         f'{SPRITES_BASE}/versions/generation-v/black-white/animated/female/{n}.gif'),
        (f'versions/generation-v/black-white/animated/shiny/{n}.gif',
         f'{SPRITES_BASE}/versions/generation-v/black-white/animated/shiny/{n}.gif'),
        (f'other/showdown/{n}.gif',
         f'{SPRITES_BASE}/other/showdown/{n}.gif'),
        (f'other/showdown/female/{n}.gif',
         f'{SPRITES_BASE}/other/showdown/female/{n}.gif'),
        (f'other/showdown/shiny/{n}.gif',
         f'{SPRITES_BASE}/other/showdown/shiny/{n}.gif'),

        # ── Rarity 3: HOME 3D ─────────────────────────────────────────────
        (f'other/home/{n}.png',
         f'{SPRITES_BASE}/other/home/{n}.png'),
        (f'other/home/female/{n}.png',
         f'{SPRITES_BASE}/other/home/female/{n}.png'),
        (f'other/home/shiny/{n}.png',
         f'{SPRITES_BASE}/other/home/shiny/{n}.png'),
        (f'other/home/shiny/female/{n}.png',
         f'{SPRITES_BASE}/other/home/shiny/female/{n}.png'),

        # ── Rarity 4: official artwork ────────────────────────────────────
        (f'other/official-artwork/{n}.png',
         f'{SPRITES_BASE}/other/official-artwork/{n}.png'),
        (f'other/official-artwork/shiny/{n}.png',
         f'{SPRITES_BASE}/other/official-artwork/shiny/{n}.png'),
        (f'versions/generation-vi/omegaruby-alphasapphire/shiny/{n}.png',
         f'{SPRITES_BASE}/versions/generation-vi/omegaruby-alphasapphire/shiny/{n}.png'),

        # ── Rarity 5: Dream World SVG ──────────────────────────────────────
        (f'other/dream-world/{n}.svg',
         f'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/{n}.svg'),
    ]

    print(f'\n=== {name} (#{n}) ===')
    for rel_path, url in files:
        dest = os.path.join(root, rel_path)
        download(url, dest)

print('\nDone.')
