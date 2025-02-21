"use client";

const Marquee: React.FC = () => {
  return (
    <div className="relative overflow-hidden whitespace-nowrap">
      <div className="scroll">これは流れるテキストのテスト文章です。</div>
    </div>
  );
};

export default Marquee;
