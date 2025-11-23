// --- 3. 대시보드 내용물 ---
const DashboardContent = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded">
      <h3 className="text-gray-500 text-sm">총 매출</h3>
      <p className="text-2xl font-bold mt-2">₩ 1,250,000</p>
    </div>
    {/* 추가 카드들... */}
  </div>
);

export default DashboardContent;