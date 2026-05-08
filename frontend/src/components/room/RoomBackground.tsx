export default function RoomBackground() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 320 280"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Wall ── */}
      <rect x="0" y="0" width="320" height="180" fill="#FFF5E6" />

      {/* Wall subtle texture lines */}
      <line x1="0" y1="60" x2="320" y2="60" stroke="#F5E8D0" strokeWidth="0.5" />
      <line x1="0" y1="120" x2="320" y2="120" stroke="#F5E8D0" strokeWidth="0.5" />

      {/* ── Floor ── */}
      <rect x="0" y="180" width="320" height="100" fill="#D4A96A" />

      {/* Floor wood grain lines */}
      <line x1="0" y1="198" x2="320" y2="198" stroke="#C49458" strokeWidth="0.8" />
      <line x1="0" y1="216" x2="320" y2="216" stroke="#C49458" strokeWidth="0.8" />
      <line x1="0" y1="234" x2="320" y2="234" stroke="#C49458" strokeWidth="0.8" />
      <line x1="0" y1="252" x2="320" y2="252" stroke="#C49458" strokeWidth="0.8" />
      <line x1="0" y1="270" x2="320" y2="270" stroke="#C49458" strokeWidth="0.8" />
      {/* Vertical plank breaks */}
      <line x1="55" y1="180" x2="50" y2="280" stroke="#C49458" strokeWidth="0.6" />
      <line x1="115" y1="180" x2="108" y2="280" stroke="#C49458" strokeWidth="0.6" />
      <line x1="185" y1="180" x2="180" y2="280" stroke="#C49458" strokeWidth="0.6" />
      <line x1="255" y1="180" x2="252" y2="280" stroke="#C49458" strokeWidth="0.6" />

      {/* ── Baseboard ── */}
      <rect x="0" y="174" width="320" height="9" fill="#E8C898" />
      <line x1="0" y1="174" x2="320" y2="174" stroke="#C8A870" strokeWidth="1" />
      <line x1="0" y1="183" x2="320" y2="183" stroke="#C8A870" strokeWidth="0.5" />

      {/* ── Window ── */}
      {/* Outer shadow */}
      <rect x="29" y="17" width="78" height="96" rx="5" fill="#00000018" />
      {/* Frame */}
      <rect x="28" y="16" width="78" height="96" rx="5" fill="#9B7840" />
      {/* Sky outside */}
      <rect x="34" y="22" width="66" height="84" rx="2" fill="#B8DCFF" />
      {/* Sun */}
      <circle cx="85" cy="35" r="8" fill="#FFE566" opacity="0.9" />
      <circle cx="85" cy="35" r="5" fill="#FFD700" />
      {/* Sun rays */}
      {[0,45,90,135].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={85 + Math.cos(rad) * 7}
            y1={35 + Math.sin(rad) * 7}
            x2={85 + Math.cos(rad) * 11}
            y2={35 + Math.sin(rad) * 11}
            stroke="#FFE566"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        );
      })}
      {/* Clouds outside window */}
      <ellipse cx="48" cy="38" rx="8" ry="5" fill="white" opacity="0.75" />
      <ellipse cx="55" cy="35" rx="7" ry="4" fill="white" opacity="0.75" />
      <ellipse cx="43" cy="37" rx="5" ry="3.5" fill="white" opacity="0.75" />
      <ellipse cx="52" cy="58" rx="6" ry="3.5" fill="white" opacity="0.5" />
      <ellipse cx="44" cy="57" rx="5" ry="3" fill="white" opacity="0.5" />
      {/* Window frame cross dividers */}
      <line x1="67" y1="22" x2="67" y2="106" stroke="#9B7840" strokeWidth="3" />
      <line x1="34" y1="64" x2="100" y2="64" stroke="#9B7840" strokeWidth="3" />
      {/* Glass sheen */}
      <rect x="35" y="23" width="14" height="40" rx="1" fill="white" opacity="0.12" />
      {/* Window sill */}
      <rect x="24" y="108" width="86" height="7" rx="2" fill="#B89050" />

      {/* Left curtain */}
      <path d="M28,16 Q16,50 20,112 L32,112 L28,16 Z" fill="#FFB3B3" opacity="0.88" />
      <ellipse cx="24" cy="64" rx="8" ry="5" fill="#FF9999" opacity="0.6" />

      {/* Right curtain */}
      <path d="M106,16 Q118,50 114,112 L102,112 L106,16 Z" fill="#FFB3B3" opacity="0.88" />
      <ellipse cx="110" cy="64" rx="8" ry="5" fill="#FF9999" opacity="0.6" />

      {/* ── Desk + Chair ── */}
      {/* Desk shadow */}
      <ellipse cx="115" cy="207" rx="62" ry="6" fill="#00000015" />
      {/* Desk top */}
      <rect x="58" y="162" width="118" height="13" rx="3" fill="#C8904A" />
      <rect x="60" y="159" width="114" height="6" rx="2" fill="#DDA060" />
      {/* Desk legs */}
      <rect x="66" y="175" width="9" height="30" rx="2" fill="#B07838" />
      <rect x="159" y="175" width="9" height="30" rx="2" fill="#B07838" />
      {/* Desk crossbar */}
      <rect x="72" y="196" width="90" height="5" rx="2" fill="#C08848" />
      {/* Book on desk */}
      <rect x="130" y="152" width="20" height="10" rx="1" fill="#7CBCF0" />
      <rect x="132" y="150" width="18" height="3" rx="1" fill="#5AACEC" />
      {/* Small plant on desk */}
      <rect x="74" y="155" width="8" height="8" rx="2" fill="#A0724A" />
      <ellipse cx="78" cy="154" rx="7" ry="5" fill="#6ABF69" />
      <ellipse cx="74" cy="152" rx="4" ry="3" fill="#5AB058" />
      <ellipse cx="82" cy="152" rx="4" ry="3" fill="#5AB058" />

      {/* Chair shadow */}
      <ellipse cx="107" cy="229" rx="28" ry="4" fill="#00000012" />
      {/* Chair back */}
      <rect x="88" y="185" width="40" height="24" rx="3" fill="#DDA050" />
      <line x1="100" y1="188" x2="100" y2="206" stroke="#C89040" strokeWidth="1.5" />
      <line x1="114" y1="188" x2="114" y2="206" stroke="#C89040" strokeWidth="1.5" />
      {/* Chair seat */}
      <rect x="85" y="207" width="46" height="12" rx="3" fill="#C8904A" />
      {/* Chair legs */}
      <rect x="88" y="219" width="7" height="18" rx="2" fill="#B07838" />
      <rect x="121" y="219" width="7" height="18" rx="2" fill="#B07838" />
      <rect x="89" y="230" width="40" height="4" rx="2" fill="#C08848" />

      {/* ── Bed ── */}
      {/* Bed shadow */}
      <ellipse cx="258" cy="244" rx="58" ry="8" fill="#00000018" />
      {/* Bed frame */}
      <rect x="198" y="178" width="122" height="90" rx="6" fill="#C09898" />
      {/* Headboard */}
      <rect x="196" y="168" width="126" height="24" rx="5" fill="#A88080" />
      <rect x="200" y="172" width="118" height="16" rx="4" fill="#B89090" />
      {/* Headboard decoration */}
      <circle cx="230" cy="180" r="4" fill="#D4A8A8" />
      <circle cx="259" cy="180" r="4" fill="#D4A8A8" />
      <circle cx="288" cy="180" r="4" fill="#D4A8A8" />
      {/* Mattress */}
      <rect x="202" y="194" width="114" height="68" rx="4" fill="#FDE8E8" />
      {/* Blanket */}
      <rect x="202" y="216" width="114" height="46" rx="4" fill="#F0B8C0" />
      {/* Blanket fold */}
      <rect x="202" y="216" width="114" height="10" rx="2" fill="#EAA8B4" />
      {/* Pillow */}
      <rect x="210" y="197" width="90" height="20" rx="8" fill="#FFFFFF" />
      <line x1="212" y1="207" x2="298" y2="207" stroke="#F0D8D8" strokeWidth="1" />
      {/* Pillow sheen */}
      <rect x="213" y="199" width="25" height="6" rx="3" fill="white" opacity="0.5" />
      {/* Footboard */}
      <rect x="196" y="258" width="126" height="10" rx="4" fill="#A88080" />
    </svg>
  );
}
