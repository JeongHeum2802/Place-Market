import React from 'react';
import { 
  ChefHat, 
  Utensils, 
  Archive, 
  AlertCircle, 
  ArrowRight, 
  Menu,
  ClipboardList
} from 'lucide-react';

const DashboardContent = () => {
  // KPI 데이터: 식당 운영의 핵심 지표
  const metrics = [
    { label: '오늘 매출 (추정)', value: '₩850,000', sub: '전일 대비 +12%', icon: Utensils },
    { label: '주문 처리 건수', value: '42건', sub: '점심 피크 타임', icon: ClipboardList },
    { label: '재고 경고 품목', value: '3건', sub: '발주 필요', icon: AlertCircle },
    { label: '총 식자재 가치', value: '₩2,400,000', sub: '이번 주 입고 포함', icon: Archive },
  ];

  // 메뉴-재고 연동 예시 데이터
  // 메뉴가 팔리면 -> 연결된 재료(Recipe)가 차감되는 로직을 보여주기 위함
  const recentOrders = [
    { 
      id: '#ORD-092', 
      menu: '트러플 크림 파스타', 
      qty: 2, 
      time: '12:42 PM',
      usedIngredients: ['파스타면 300g', '생크림 200ml', '트러플 오일 10ml'] 
    },
    { 
      id: '#ORD-091', 
      menu: '채끝 등심 스테이크', 
      qty: 1, 
      time: '12:35 PM',
      usedIngredients: ['채끝 등심 200g', '가니쉬 모둠 1set', '로즈마리 5g'] 
    },
    { 
      id: '#ORD-090', 
      menu: '시저 샐러드', 
      qty: 3, 
      time: '12:30 PM',
      usedIngredients: ['로메인 150g', '베이컨 30g', '시저 드레싱 50ml'] 
    },
  ];

  // 재료 현황 데이터 (적정 재고 대비 현재 재고)
  const ingredientStatus = [
    { name: '엑스트라 버진 올리브유', current: 15, max: 100, unit: 'L', status: 'normal' },
    { name: '파마산 치즈 블럭', current: 8, max: 50, unit: 'kg', status: 'critical' }, // 위험
    { name: '이베리코 베이컨', current: 45, max: 100, unit: 'pack', status: 'normal' },
    { name: '유기농 루꼴라', current: 12, max: 100, unit: 'box', status: 'critical' }, // 위험
    { name: '화이트 와인 (조리용)', current: 60, max: 100, unit: 'btl', status: 'normal' },
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* 네비게이션 바 */}
      <nav className="border-b-2 border-black px-8 py-5 flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-black text-white p-2">
            <ChefHat size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">KITCHEN MANAGER</h1>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <button className="hover:underline underline-offset-4">대시보드</button>
          <button className="text-gray-400 hover:text-black transition-colors">재고 관리</button>
          <button className="text-gray-400 hover:text-black transition-colors">메뉴/레시피</button>
          <button className="text-gray-400 hover:text-black transition-colors">발주 내역</button>
        </div>
      </nav>

      <main className="p-8 max-w-7xl mx-auto">
        
        {/* 상단 메트릭스 (KPI) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((item, idx) => (
            <div key={idx} className="border border-black p-6 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow cursor-default">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{item.label}</span>
                <item.icon size={20} className="stroke-1" />
              </div>
              <div className="text-3xl font-bold mb-1">{item.value}</div>
              <div className="text-xs text-gray-500 border-l-2 border-black pl-2">{item.sub}</div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 왼쪽: 실시간 주문 및 재료 차감 로그 */}
          <section className="lg:col-span-2 border border-black p-0">
            <div className="p-6 border-b border-black flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Utensils size={18} />
                실시간 주문 & 재료 차감
              </h2>
              <span className="text-xs font-bold border border-black px-2 py-1 bg-white">LIVE</span>
            </div>
            
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-mono text-gray-500 mr-2">{order.time}</span>
                      <span className="text-sm font-bold">{order.menu}</span>
                      <span className="ml-2 text-xs bg-black text-white px-1.5 py-0.5 rounded-none">x{order.qty}</span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">{order.id}</span>
                  </div>
                  
                  {/* 여기가 핵심: 메뉴와 연동된 재료 보여주기 */}
                  <div className="bg-gray-100 p-3 text-xs border-l-4 border-black">
                    <div className="font-bold text-gray-600 mb-1 flex items-center gap-1">
                      <ArrowRight size={10} /> 재료 자동 차감 내역:
                    </div>
                    <div className="flex flex-wrap gap-2 text-gray-600">
                      {order.usedIngredients.map((ing, i) => (
                        <span key={i} className="bg-white border border-gray-300 px-2 py-1">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center border-t border-black">
              <button className="text-sm font-bold underline underline-offset-4 hover:text-gray-600">
                전체 주문 내역 보기
              </button>
            </div>
          </section>

          {/* 오른쪽: 식자재 재고 현황 */}
          <section className="border border-black p-6 h-fit sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Archive size={18} />
                주요 식자재 현황
              </h2>
            </div>

            <div className="space-y-6">
              {ingredientStatus.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">
                      {item.name} 
                      {item.status === 'critical' && (
                        <AlertCircle size={14} className="inline ml-2 mb-0.5 text-black fill-black text-white stroke-white bg-black rounded-full" />
                      )}
                    </span>
                    <span className="font-mono text-xs text-gray-500">
                      {item.current} / {item.max} {item.unit}
                    </span>
                  </div>
                  {/* 커스텀 프로그레스 바 (B&W 스타일) */}
                  <div className="w-full h-3 border border-black p-0.5">
                    <div 
                      className={`h-full ${item.status === 'critical' ? 'bg-[url("https://www.transparenttextures.com/patterns/diagmonds-light.png")] bg-black' : 'bg-gray-400'}`}
                      style={{ width: `${(item.current / item.max) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
              <div className="bg-black text-white p-4 text-center cursor-pointer hover:bg-gray-800 transition-colors">
                <span className="font-bold text-sm">부족 재료 일괄 발주하기</span>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};
export default DashboardContent;