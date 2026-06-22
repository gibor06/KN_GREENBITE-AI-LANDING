import { useState, useEffect } from 'react';
import { 
  TrendingDown, 
  Brain, 
  Clock, 
  QrCode, 
  Leaf, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  User, 
  Store, 
  Mail,
  ChevronRight,
  Menu,
  X,
  DollarSign,
  Activity,
  Award,
  Play,
  Check,
  Utensils,
  Soup,
  Sandwich,
  CupSoda
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState('student');
  
  // Registration state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [storeName, setStoreName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Active section scroll spy
  const [activeSection, setActiveSection] = useState('');

  // AI Demo Playground State
  const [selectedFood, setSelectedFood] = useState('com_tam');
  const [remainingQty, setRemainingQty] = useState(12);
  const [hoursToClose, setHoursToClose] = useState(1.5);
  const [isCalculating, setIsCalculating] = useState(false);
  const [demoResult, setDemoResult] = useState(null);

  const foodCatalog = {
    com_tam: { name: "Cơm tấm sườn bì chả", price: 40000, type: "Món mặn", icon: Utensils },
    hu_tieu: { name: "Hủ tiếu Nam Vang", price: 35000, type: "Món nước", icon: Soup },
    banh_mi: { name: "Bánh mì đặc biệt", price: 25000, type: "Món khô", icon: Sandwich },
    tra_sua: { name: "Trà sữa Thái đỏ", price: 22000, type: "Đồ uống", icon: CupSoda }
  };

  useEffect(() => {
    const sections = ['problem', 'timing', 'solution', 'features', 'ai-demo', 'business', 'roadmap'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // Offset for sticky header
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sampleFoods = [
    {
      name: "Cơm gà xối mỡ",
      oldPrice: "35.000đ",
      newPrice: "25.000đ",
      discount: "-28%",
      pickupTime: "18:00 - 19:00",
      risk: "Thấp",
      tag: "Bán chạy nhất",
      icon: Utensils
    },
    {
      name: "Bánh mì heo quay",
      oldPrice: "22.000đ",
      newPrice: "16.000đ",
      discount: "-27%",
      pickupTime: "17:30 - 18:30",
      risk: "Thấp",
      tag: "Giòn nóng",
      icon: Sandwich
    },
    {
      name: "Trà đào cam sả",
      oldPrice: "25.000đ",
      newPrice: "18.000đ",
      discount: "-28%",
      pickupTime: "18:00 - 20:00",
      risk: "Thấp",
      tag: "Mát lạnh",
      icon: CupSoda
    },
  ];

  const handleCalculateAI = () => {
    setIsCalculating(true);
    setDemoResult(null);
    
    setTimeout(() => {
      const foodItem = foodCatalog[selectedFood];
      
      // Surplus risk calculation logic
      let riskPercent = Math.min(Math.round((remainingQty / 15) * 50 + (4 - hoursToClose) * 12), 98);
      if (riskPercent < 20) riskPercent = 20;

      // Recommended Discount calculation logic
      let discount = 20;
      if (riskPercent > 70) {
        discount = 30;
      } else if (riskPercent > 40) {
        discount = 25;
      }
      
      const rescuePrice = foodItem.price * (1 - discount / 100);
      
      // Food Risk Score based on category and remaining hours
      let riskScore;
      if (foodItem.type === "Món nước") {
        riskScore = 0.25 - (hoursToClose * 0.03); // higher risk for soup
      } else {
        riskScore = 0.15 - (hoursToClose * 0.02);
      }
      if (riskScore < 0.05) riskScore = 0.05;
      
      setDemoResult({
        surplusRisk: riskPercent,
        recommendedDiscount: discount,
        rescuePrice: rescuePrice.toLocaleString('vi-VN') + "đ",
        riskScore: riskScore.toFixed(2),
        riskLevel: riskScore > 0.2 ? "Trung bình" : "Rất thấp"
      });
      setIsCalculating(false);
    }, 850);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitted(true);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full max-w-7xl h-[800px] overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[50%] left-[20%] w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* FLOATING HEADER */}
      <div className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
        <header className="max-w-7xl mx-auto bg-slate-950/70 backdrop-blur-xl border border-slate-800/80 rounded-3xl transition-all duration-300 shadow-2xl">
          <div className="px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              
              {/* Logo */}
              <div 
                className="flex items-center space-x-2.5 cursor-pointer group" 
                onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                  <Leaf className="w-5.5 h-5.5 text-slate-950" />
                </div>
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  GreenBite<span className="text-emerald-400 font-extrabold">AI</span>
                </span>
              </div>

              {/* Desktop Nav (Matching uploaded image options) */}
              <nav className="hidden lg:flex space-x-6 xl:space-x-8 text-xs xl:text-sm font-bold">
                {[
                  { name: "Vấn đề", id: "problem" },
                  { name: "Thời điểm", id: "timing" },
                  { name: "Giải pháp", id: "solution" },
                  { name: "Công nghệ", id: "features" },
                  { name: "Demo AI", id: "ai-demo" },
                  { name: "Kinh doanh", id: "business" },
                  { name: "Lộ trình", id: "roadmap" }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)} 
                    className={`relative py-2 transition-colors duration-300 hover:text-emerald-400 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-gradient-to-r after:from-emerald-400 after:to-teal-300 after:transition-all after:duration-300 hover:after:w-full ${
                      activeSection === item.id ? 'text-emerald-400 after:w-full' : 'text-slate-400 after:w-0'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center space-x-4">
                <button 
                  onClick={() => {
                    setRole('merchant');
                    scrollToSection('register');
                  }} 
                  className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 transition-all border border-slate-800 rounded-2xl hover:bg-slate-800/50"
                >
                  Dành cho quán ăn
                </button>
                <button 
                  onClick={() => {
                    setRole('student');
                    scrollToSection('register');
                  }} 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-black px-6 py-2.5 rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs tracking-wide"
                >
                  Đăng ký dùng thử
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-slate-400 hover:text-white p-2 focus:outline-none bg-slate-900 border border-slate-800 rounded-xl"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl rounded-b-3xl px-6 py-6 space-y-4">
              {[
                { name: "Vấn đề", id: "problem" },
                { name: "Thời điểm", id: "timing" },
                { name: "Giải pháp", id: "solution" },
                { name: "Công nghệ", id: "features" },
                { name: "Demo AI", id: "ai-demo" },
                { name: "Kinh doanh", id: "business" },
                { name: "Lộ trình", id: "roadmap" }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className={`block w-full text-left py-2 font-bold transition-colors ${
                    activeSection === item.id ? 'text-emerald-400' : 'text-slate-300 hover:text-emerald-400'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-800 flex flex-col space-y-3">
                <button 
                  onClick={() => {
                    setRole('student');
                    scrollToSection('register');
                  }} 
                  className="w-full text-center py-3 font-bold text-slate-300 hover:text-white border border-slate-800 rounded-2xl text-xs hover:bg-slate-800"
                >
                  Tôi là Sinh Viên
                </button>
                <button 
                  onClick={() => {
                    setRole('merchant');
                    scrollToSection('register');
                  }} 
                  className="w-full text-center py-3 font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 rounded-2xl text-xs shadow-lg shadow-emerald-500/10"
                >
                  Tôi là Quán F&B
                </button>
              </div>
            </div>
          )}
        </header>
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 lg:pt-20 lg:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8 text-left relative">
              <div className="inline-flex items-center space-x-2 bg-emerald-950/60 border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-400 font-bold text-xs tracking-wider uppercase shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>AI Food Rescue Platform for Campus F&B</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
                Cứu món ngon <br />cuối ngày, <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                  tiết kiệm từng bữa ăn.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-400 max-w-xl leading-relaxed">
                GreenBiteAI giúp các quán ăn quanh trường đại học đăng món ăn chất lượng còn dư cuối ngày, sử dụng trí tuệ nhân tạo dự báo và định giá hợp lý, đồng thời giúp sinh viên đặt món minh bạch, nhận đồ nhanh bằng mã QR.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                  onClick={() => {
                    setRole('student');
                    scrollToSection('register');
                  }} 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-black px-8 py-4.5 rounded-2xl text-sm shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all flex items-center justify-center space-x-2.5"
                >
                  <span>Sinh viên đặt đồ ngay</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
                <button 
                  onClick={() => {
                    setRole('merchant');
                    scrollToSection('register');
                  }} 
                  className="bg-slate-950 hover:bg-slate-900 text-white border border-slate-800 hover:border-slate-700 font-bold px-8 py-4.5 rounded-2xl text-sm transition-all text-center"
                >
                  Quán ăn đăng ký đối tác
                </button>
              </div>

              {/* Status info */}
              <div className="flex items-center space-x-2.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80 max-w-xl">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                </span>
                <span>Dự án đang giai đoạn pilot thử nghiệm quanh khu vực các trường Đại học</span>
              </div>
            </div>

            {/* Right Visual Phone Mockup Column */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -z-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-[80px] animate-pulse" />
              
              <div className="relative w-[310px] h-[620px] bg-slate-950 rounded-[48px] border-[8px] border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] p-3.5 flex flex-col justify-between overflow-hidden">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-950 rounded-full z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900 border border-slate-800/50" />
                </div>

                {/* Inner Screen */}
                <div className="flex-1 bg-slate-900 rounded-[34px] overflow-hidden p-4 pt-6 flex flex-col justify-between text-left space-y-4">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold px-1">
                    <span>9:41 AM</span>
                    <span className="flex items-center space-x-1">
                      <span>5G</span>
                      <div className="w-4 h-2 bg-slate-600 rounded-sm" />
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">GreenBite Rescue</span>
                      <h4 className="text-sm font-extrabold text-white">Món ngon quanh bạn</h4>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-emerald-950 border border-emerald-500/30 flex items-center justify-center">
                      <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>

                  {/* Live Feed */}
                  <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5 no-scrollbar">
                    {sampleFoods.map((food, idx) => {
                      const FoodIcon = food.icon;
                      return (
                        <div 
                          key={idx}
                          className="bg-slate-950/70 border border-slate-800/60 p-2.5 rounded-xl flex items-center justify-between hover:border-emerald-500/30 transition-all duration-300"
                        >
                          <div className="flex items-center space-x-2.5">
                            <div className="p-2 bg-slate-900 rounded-lg text-emerald-400">
                              <FoodIcon className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-white leading-tight">{food.name}</h5>
                              <div className="flex items-center space-x-1.5 mt-0.5">
                                <span className="text-[9px] text-slate-500 line-through">{food.oldPrice}</span>
                                <span className="text-[10px] text-emerald-400 font-extrabold">{food.newPrice}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-[8px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-full font-bold">
                              {food.pickupTime}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Inner Ticket Card */}
                  <div className="bg-slate-950 border border-emerald-500/20 p-3 rounded-2xl space-y-2.5 shadow-inner">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-emerald-400 font-bold flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Đã xác nhận đơn
                      </span>
                      <span className="text-slate-500">Mã đơn: #GB-492</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h6 className="text-[11px] font-bold text-white">Cơm gà xối mỡ x1</h6>
                        <p className="text-[9px] text-slate-500">Giờ nhận: 18:00 - 18:30</p>
                      </div>
                      <div className="w-9 h-9 bg-white p-0.5 rounded-lg flex items-center justify-center">
                        <QrCode className="w-8 h-8 text-slate-950" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-20 -left-12 bg-slate-950/90 border border-slate-800 p-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 animate-float max-w-[160px]">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Leaf className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Giảm phát thải</p>
                  <p className="text-xs font-black text-white">-3.1 Kg CO2</p>
                </div>
              </div>

              <div className="absolute bottom-28 -right-10 bg-slate-950/90 border border-slate-800 p-3.5 rounded-2xl shadow-2xl flex items-center space-x-3 animate-float-reverse max-w-[160px]">
                <div className="w-8 h-8 rounded-xl bg-orange-950 border border-orange-500/30 flex items-center justify-center text-orange-400">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-500 font-bold uppercase">Tiết kiệm</p>
                  <p className="text-xs font-black text-white">Đến 30% giá</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 1. PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-slate-950 border-y border-slate-800/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Thực trạng thị trường</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Lãng phí thực phẩm tại các cổng trường đại học
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Sự thiếu đồng bộ trong thông tin giữa người bán F&B và sinh viên dẫn đến lượng lớn món ăn ngon cuối ngày bị hủy bỏ lãng phí.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Đối với Quán F&B",
                desc: "Thức ăn chất lượng vẫn còn tốt cuối ngày nhưng không có công cụ tiếp cận tập khách hàng sinh viên nhanh chóng, gây mất mát doanh thu đáng tiếc.",
                icon: Store,
                color: "from-orange-500/10 to-transparent border-orange-500/20 text-orange-400"
              },
              {
                title: "Đối với Sinh viên",
                desc: "Mong muốn tìm kiếm bữa ăn giá rẻ, hợp lý quanh giảng đường nhưng thiếu thông tin minh bạch về chất lượng món dư và thời gian mở bán.",
                icon: User,
                color: "from-emerald-500/10 to-transparent border-emerald-500/20 text-emerald-400"
              },
              {
                title: "Đối với Môi trường",
                desc: "Quá trình chôn lấp thực phẩm hủy bỏ sinh ra khí metan độc hại. Việc chưa đo lường được tác động xanh làm giảm động lực hành động vì môi trường.",
                icon: Leaf,
                color: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400"
              }
            ].map((prob, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 text-left space-y-6 relative overflow-hidden group hover:border-slate-700 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-slate-800/10 to-transparent border-slate-800/20 blur-2xl opacity-40" />
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <prob.icon className={`w-6 h-6 ${prob.color.split(' ').pop()}`} />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{prob.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10">{prob.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. TIMING SECTION (Why Now?) */}
      <section id="timing" className="py-24 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Yếu tố thời điểm</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Tại sao lại là thời điểm này? (Why Now?)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Sự hội tụ của công nghệ số, xu hướng ESG và nhu cầu thực tiễn biến GreenBiteAI trở thành mô hình cấp thiết ngay lúc này.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "1. Sự phổ biến của thanh toán & định danh QR",
                desc: "100% sinh viên ngày nay quen thuộc với việc quét mã QR và giao dịch không tiền mặt. Điều này giúp thao tác nhận món tự động tại quầy trở nên tự nhiên và nhanh chóng hơn bao giờ hết.",
                metric: "98% Sinh viên quét QR hàng ngày",
                icon: QrCode
              },
              {
                title: "2. Áp lực thắt chặt chi tiêu học đường",
                desc: "Chi phí sinh hoạt và giá thực phẩm leo thang gây áp lực nặng nề lên ngân sách của sinh viên đại học. Bữa ăn tiết kiệm dưới 25.000đ trở thành lựa chọn thiết yếu hàng đầu.",
                metric: "86.5% Sẵn sàng đón nhận giải pháp",
                icon: DollarSign
              },
              {
                title: "3. Cam kết chuyển đổi xanh & ESG",
                desc: "Các trường đại học ngày càng quan tâm đến việc xây dựng 'Green Campus' và chuyển đổi số F&B. Dự án trực tiếp đồng hành hỗ trợ mục tiêu giảm thiểu 1/3 rác thải thực phẩm của quốc gia.",
                metric: "Giảm 3.1 tấn CO2 (Quy đổi pilot)",
                icon: Leaf
              }
            ].map((time, idx) => (
              <div 
                key={idx}
                className="bg-slate-950/60 border border-slate-800/80 p-8 rounded-3xl text-left space-y-5 flex flex-col justify-between hover:border-slate-700 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <time.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{time.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{time.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-800/60">
                  <span className="text-xs text-emerald-400 font-extrabold bg-emerald-950/80 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                    {time.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. SOLUTION SECTION */}
      <section id="solution" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (Text & Accent) */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Giải pháp công nghệ</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Mô hình cứu trợ có dữ liệu & AI
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                GreenBiteAI kết nối các quán ăn với sinh viên thông qua một quy trình số hóa thông minh: dự báo dư thừa trước bằng AI, bảo vệ chất lượng bằng thang điểm an toàn, đặt nhận món chính xác bằng mã QR.
              </p>
              <div className="pt-4 border-t border-slate-800">
                <blockquote className="text-xs text-slate-500 italic">
                  &ldquo;Giải pháp tối ưu hóa kinh doanh song hành với chuyển đổi số bền vững.&rdquo;
                </blockquote>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  title: "Dự báo & hỗ trợ ra quyết định",
                  desc: "AI phân tích dữ liệu lịch sử và tồn kho để gợi ý số lượng phần đăng và giá giảm tối ưu cuối ngày cho chủ quán.",
                  icon: Brain,
                  tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                },
                {
                  title: "Xác thực đơn hàng qua QR bảo mật",
                  desc: "Mỗi phần ăn đặt chỗ thành công sẽ được kích hoạt bằng một mã QR riêng. Người mua chỉ cần quét nhanh tại quầy là nhận món.",
                  icon: QrCode,
                  tagColor: "bg-orange-500/10 text-orange-400 border-orange-500/20"
                },
                {
                  title: "Thống kê tác động xanh theo thời gian thực",
                  desc: "Theo dõi lượng CO2 giảm phát thải, ngân sách sinh viên tiết kiệm và doanh thu quán ăn thu hồi trực quan trên biểu đồ.",
                  icon: Activity,
                  tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20"
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 hover:bg-slate-950 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${item.tagColor}`}>
                    <item.icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="text-left space-y-1.5">
                    <h4 className="text-base font-bold text-white">{item.title}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 4. TECH / BENTO FEATURE SECTION */}
      <section id="features" className="py-24 bg-slate-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Hệ sinh thái tính năng</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Các công nghệ cốt lõi của GreenBiteAI
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Kiến trúc bento grid hiện đại biểu đạt 6 cấu phần công nghệ giúp hệ thống vận hành trơn tru và an toàn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Card 1: AI Surplus Forecasting (Large - 8 cols md) */}
            <div className="md:col-span-8 bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl text-left flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all duration-300">
              <div className="space-y-3">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Trí tuệ nhân tạo</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">AI Surplus Forecasting</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Dự báo món ăn có khả năng dư cuối ngày dựa vào lịch sử đơn hàng, điều kiện thời tiết, lượng tồn thực tế và các sự kiện diễn ra tại khu vực trường đại học. Hỗ trợ người bán chủ động lượng phần chuẩn bị.
                </p>
              </div>
              
              <div className="bg-slate-950/80 border border-slate-800/60 p-4.5 rounded-2xl space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span className="font-bold">Đồ thị dự đoán lượng tồn dư (Món Cơm gà)</span>
                  <span className="text-emerald-400 flex items-center"><Activity className="w-3.5 h-3.5 mr-1" /> Đang cập nhật</span>
                </div>
                <div className="h-20 flex items-end justify-between space-x-1.5 pt-4">
                  <div className="w-full bg-slate-900 h-[25%] rounded-t relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-500">11h</span></div>
                  <div className="w-full bg-slate-900 h-[35%] rounded-t relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-500">13h</span></div>
                  <div className="w-full bg-slate-900 h-[45%] rounded-t relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-500">15h</span></div>
                  <div className="w-full bg-emerald-500/60 h-[85%] rounded-t relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-emerald-400 font-bold">17h</span></div>
                  <div className="w-full bg-slate-900 h-[20%] rounded-t relative"><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-500">19h</span></div>
                </div>
              </div>
            </div>

            {/* Card 2: Dynamic Rescue Pricing (Medium - 4 cols md) */}
            <div className="md:col-span-4 bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl text-left flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all duration-300">
              <div className="space-y-3">
                <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Định giá linh hoạt</span>
                <h3 className="text-xl font-black text-white">Dynamic Rescue Pricing</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tối ưu hóa giá cứu trợ dựa trên khung giờ bán còn lại và nhu cầu thực tế của sinh viên, đảm bảo giải phóng món nhanh nhất.
                </p>
              </div>
              <div className="bg-slate-950/80 border border-slate-800/60 p-4 rounded-2xl text-center">
                <div className="text-xs text-slate-500 mb-1.5">Mức giảm giá đề xuất bởi AI</div>
                <div className="text-3xl font-black text-orange-400">-28% đến -30%</div>
              </div>
            </div>

            {/* Card 3: Food Risk Score (Medium - 4 cols md) */}
            <div className="md:col-span-4 bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl text-left flex flex-col justify-between space-y-6 hover:border-slate-700 transition-all duration-300">
              <div className="space-y-3">
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">An toàn vệ sinh</span>
                <h3 className="text-xl font-black text-white">Food Risk Score</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Sàng lọc rủi ro thực phẩm dựa trên loại nguyên liệu, thời gian chế biến, cách thức đóng gói và lịch sử phản ánh của người dùng.
                </p>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-950/80 border border-slate-800/60 rounded-2xl">
                <span className="text-xs text-slate-500 font-medium">Nguy cơ nhiễm khuẩn:</span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold">Rất Thấp</span>
              </div>
            </div>

            {/* Card 4: Scheduled Pickup & QR (Large - 8 cols md) */}
            <div className="md:col-span-8 bg-slate-900/50 border border-slate-800/80 p-8 rounded-3xl text-left flex flex-col justify-between space-y-8 hover:border-slate-700 transition-all duration-300">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Scheduled Pickup</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Sinh viên tùy chọn giờ nhận món phù hợp với lịch học, giúp quán chuẩn bị trước và giảm thời gian chờ đợi.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold text-white">QR Verification</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Xác nhận đơn và nhận đồ tại quầy trong 5 giây bằng cách quét mã QR sinh ra từ hệ thống, minh bạch và chính xác.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-950/80 border border-slate-800/60 p-4.5 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Quét nhận thành công</div>
                    <div className="text-[10px] text-slate-500">Mã giao dịch: TX-9021-GB</div>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">Khung giờ: 17:30 - 18:00</span>
              </div>
            </div>

          </div>

          <div className="mt-12 bg-blue-950/30 border border-blue-800/30 rounded-2xl p-5 max-w-4xl mx-auto flex items-start space-x-3.5 text-left">
            <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-200">Lưu ý quan trọng:</span> Công cụ **Food Risk Score** đóng vai trò hỗ trợ sàng lọc rủi ro ban đầu cho sinh viên dựa trên thông tin khai báo của người bán, hoàn toàn không thay thế giấy chứng nhận vệ sinh an toàn thực phẩm của cơ quan chức năng hoặc trách nhiệm chất lượng sản phẩm từ phía chủ cửa hàng.
            </div>
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE AI PLAYGROUND (Demo AI) */}
      <section id="ai-demo" className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Trải nghiệm tương tác</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Giả lập Thuật toán AI Playground
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Hãy thử đóng vai chủ quán ăn: chọn món ăn, cấu hình lượng tồn và thời gian bán để xem AI của GreenBiteAI tính toán tự động.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto grid md:grid-cols-12 gap-8 shadow-2xl">
            
            {/* Config Left Column */}
            <div className="md:col-span-6 space-y-6 text-left">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Brain className="w-5 h-5 text-emerald-400 mr-2" /> Cấu hình cửa hàng cuối ngày
              </h3>
              
              {/* Select Food */}
              <div className="space-y-2">
                <label className="block text-xs text-slate-400 font-bold uppercase tracking-wider">Chọn món ăn cần đăng</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(foodCatalog).map((key) => {
                    const FoodIcon = foodCatalog[key].icon;
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setSelectedFood(key)}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          selectedFood === key 
                            ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg' 
                            : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-emerald-400 mb-1.5">
                          <FoodIcon className="w-5.5 h-5.5" />
                        </div>
                        <span className="text-xs font-bold block truncate">{foodCatalog[key].name}</span>
                        <span className="text-[10px] text-slate-500 block">Gốc: {foodCatalog[key].price.toLocaleString('vi-VN')}đ</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider">Số lượng phần ăn còn dư</span>
                  <span className="text-emerald-400 font-black">{remainingQty} phần</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={remainingQty}
                  onChange={(e) => setRemainingQty(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-900 rounded-lg h-2 cursor-pointer"
                />
              </div>

              {/* Time Slider */}
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider">Thời gian đến khi đóng cửa</span>
                  <span className="text-orange-400 font-black">{hoursToClose} giờ</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="4" 
                  step="0.5"
                  value={hoursToClose}
                  onChange={(e) => setHoursToClose(parseFloat(e.target.value))}
                  className="w-full accent-orange-500 bg-slate-900 rounded-lg h-2 cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={handleCalculateAI}
                disabled={isCalculating}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-black rounded-2xl text-sm transition-all shadow-lg flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                {isCalculating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>AI đang phân tích...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-slate-950" />
                    <span>Chạy thuật toán dự báo AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Results Right Column */}
            <div className="md:col-span-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between text-left min-h-[300px]">
              {demoResult ? (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">Kết quả phân tích</span>
                    
                    {/* Gauge metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-500 font-bold block uppercase">Nguy cơ ế ẩm</span>
                        <span className="text-xl font-black text-rose-400 mt-1 block">{demoResult.surplusRisk}%</span>
                      </div>
                      <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
                        <span className="text-[9px] text-slate-500 font-bold block uppercase">Rủi ro thực phẩm</span>
                        <span className="text-xl font-black text-blue-400 mt-1 block">{demoResult.riskScore}</span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Đề xuất mức giảm giá:</span>
                        <span className="text-orange-400 font-extrabold">Giảm {demoResult.recommendedDiscount}%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm border-t border-slate-800/80 pt-2">
                        <span className="text-white font-bold">Giá cứu trợ (Rescue):</span>
                        <span className="text-emerald-400 font-black text-lg">{demoResult.rescuePrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-900/30 p-3 rounded-xl flex items-start space-x-2.5 text-xs text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p>Khung giá đảm bảo thu hồi vốn nguyên liệu tối đa và tăng khả năng bán hết thêm 40%.</p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-6">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 border border-slate-700/50">
                    <Activity className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Chưa chạy phân tích</h4>
                    <p className="text-xs text-slate-500 max-w-[240px] mx-auto mt-1 leading-normal">
                      Hãy tùy chỉnh thông số ở cột trái và bấm nút chạy thuật toán để hiển thị đề xuất từ AI.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 6. BUSINESS SECTION (Business Model) */}
      <section id="business" className="py-24 bg-slate-950 border-t border-slate-800/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Mô hình kinh doanh</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Mô hình doanh thu bền vững
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              GreenBiteAI phát triển dựa trên cơ cấu tài chính ổn định, tạo ra giá trị thiết thực và chia sẻ lợi ích cùng các đối tác F&B.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Phí dịch vụ trên đơn hàng (Commission)",
                desc: "Thu phí hoa hồng nhỏ từ 8% đến 10% trên mỗi phần ăn giải cứu thành công. Mô hình dựa trên hiệu quả thực tế: Quán bán được mới mất phí.",
                benefit: "Thu hồi 90% dòng tiền vốn dư",
                icon: DollarSign
              },
              {
                title: "Quảng cáo Xanh ưu tiên (Green Ad)",
                desc: "Cung cấp gói hiển thị quảng bá ưu tiên cho các quán ăn có tỷ lệ giải cứu thức ăn cao và phản hồi chất lượng tốt, giúp tăng uy tín thương hiệu học đường.",
                benefit: "Tăng 25% doanh số món thông thường",
                icon: Award
              },
              {
                title: "Phân tích dữ liệu & Báo cáo (SaaS Dashboard)",
                desc: "Cung cấp gói báo cáo nâng cao phân tích hành vi mua sắm của sinh viên, dự báo nguyên liệu dài hạn cho các canteen chuỗi hoặc căn tin trường học.",
                benefit: "Tối ưu hóa 15% hao hụt chuẩn bị",
                icon: Activity
              }
            ].map((model, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/50 border border-slate-850 p-8 rounded-3xl text-left space-y-6 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <model.icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">{model.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{model.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-800 flex items-center text-xs text-emerald-400 font-extrabold space-x-1.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{model.benefit}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. ROADMAP SECTION */}
      <section id="roadmap" className="py-24 bg-slate-900/50 border-t border-slate-800/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-24">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Kế hoạch phát triển</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Lộ trình triển khai dự án (Roadmap)
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Kế hoạch hành động cụ thể từ giai đoạn pilot địa phương đến mục tiêu số hóa ẩm thực xanh học đường toàn quốc.
            </p>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              {
                phase: "Q3 / 2026",
                title: "Khảo sát & Xây dựng MVP",
                desc: "Hoàn thành nghiên cứu khảo sát nhu cầu sinh viên và xây dựng thành công phiên bản phần mềm thử nghiệm ban đầu (MVP) tại HUIT."
              },
              {
                phase: "Q4 / 2026",
                title: "Vận hành Pilot HUIT",
                desc: "Hợp tác thí điểm với 10 quán F&B và canteen quanh Đại học Công thương TP.HCM. Đạt mục tiêu kết nối 500 sinh viên tích cực đầu tiên."
              },
              {
                phase: "Q1 / 2027",
                title: "Nhân rộng liên trường",
                desc: "Mở rộng hệ thống liên kết tới 3 trường lân cận tại Tân Phú và Làng Đại học Thủ Đức. Nâng cấp các tính năng dự báo AI chuyên sâu."
              },
              {
                phase: "Q2 / 2027",
                title: "Gamification & ESG Data",
                desc: "Ra mắt hệ thống tích điểm thưởng, bảng xếp hạng xanh giữa các lớp học, và cung cấp dữ liệu phát thải CO2 chính thức cho nhà trường."
              }
            ].map((step, idx) => (
              <div 
                key={idx}
                className="bg-slate-950/60 border border-slate-800/80 p-6 rounded-3xl text-left space-y-4 relative hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                    {step.phase}
                  </span>
                  <h4 className="font-extrabold text-white text-base leading-tight mt-3">{step.title}</h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2.5">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* STATS SURVEY SECTION (Moved for flow but kept on page) */}
      <section className="py-24 bg-slate-950 border-t border-slate-800/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Khảo sát & dữ liệu pilot</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Hơn 80% sinh viên quan tâm và ủng hộ mô hình
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Số liệu thực tế thu được thông qua hoạt động nghiên cứu khảo sát mẫu ban đầu tại khuôn viên trường đại học đối tác trước giai đoạn triển khai ứng dụng.
              </p>
              <div className="pt-2">
                <span className="text-[10px] bg-slate-800 text-slate-400 border border-slate-700/60 px-3.5 py-2 rounded-full font-bold uppercase tracking-wider">
                  Dữ liệu Pilot Ban đầu
                </span>
              </div>
            </div>

            {/* Right Progress Circle Grid Column */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-8">
              {[
                { value: "86.5%", label: "Sinh viên sẵn sàng dùng thử platform", sub: "Thích sự tiện lợi của QR" },
                { value: "63.5%", label: "Quan tâm đến các món cuối ngày", sub: "Tìm kiếm giải pháp tiết kiệm" },
                { value: "73.1%", label: "Sẵn sàng đi dưới 500m để nhận đồ", sub: "Khu vực quanh giảng đường" },
                { value: "84.6%", label: "Yêu cầu tự chọn khung giờ nhận", sub: "Tránh ảnh hưởng lịch học" }
              ].map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800/80 p-8 rounded-3xl text-left space-y-4 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-4xl sm:text-5xl font-black tracking-tight text-emerald-400 block">
                      {stat.value}
                    </span>
                    <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-0.5 rounded-full font-bold">
                      Khảo sát
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-sm sm:text-base leading-snug">{stat.label}</p>
                    <p className="text-slate-500 text-xs mt-1.5">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* AUDIENCE BENEFIT SECTION */}
      <section className="py-24 bg-slate-900/50 border-t border-slate-800/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Đối tác đồng hành</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Giá trị bền vững trao gửi hai đầu
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              GreenBiteAI đồng hành hỗ trợ tối đa lợi ích kinh tế cho cả sinh viên học đường và các đối tác quán ăn quanh trường.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Student Card */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 lg:p-12 text-left flex flex-col justify-between shadow-2xl hover:border-emerald-500/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Dành cho Sinh viên</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Bữa ăn ngon lành với ngân sách tiết kiệm tối đa</p>
                </div>
                <ul className="space-y-3.5 text-slate-300 text-xs sm:text-sm">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
                    <span>Mua được các phần ăn ngon sạch với giá rẻ hơn tới 30%.</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
                    <span>Dễ dàng nhận món nhanh chóng bằng QR (dưới 500m từ trường).</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
                    <span>Linh hoạt đặt chỗ theo khung giờ tự chọn phù hợp lịch học.</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-3 shrink-0" />
                    <span>Tích điểm xanh thành viên bảo vệ môi trường, nhận quà tặng.</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => {
                  setRole('student');
                  scrollToSection('register');
                }} 
                className="w-full mt-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center space-x-2"
              >
                <span>Đăng ký sử dụng (Miễn phí)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Merchant Card */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 lg:p-12 text-left flex flex-col justify-between shadow-2xl hover:border-orange-500/30 transition-all duration-300">
              <div className="space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">Dành cho Quán F&B</h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">Thu hồi nguồn vốn dư, mở rộng tệp khách hàng</p>
                </div>
                <ul className="space-y-3.5 text-slate-300 text-xs sm:text-sm">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 mr-3 shrink-0" />
                    <span>Thu hồi doanh thu hiệu quả từ các nguyên liệu còn tốt cuối ngày.</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 mr-3 shrink-0" />
                    <span>Hệ thống dự báo AI tự động gợi ý giá giảm thu hút người đặt.</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 mr-3 shrink-0" />
                    <span>Kiểm soát và giảm thiểu tình trạng đơn ảo (no-show) qua mã QR.</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 mr-3 shrink-0" />
                    <span>Tham gia hệ sinh thái ẩm thực xanh, khẳng định thương hiệu.</span>
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => {
                  setRole('merchant');
                  scrollToSection('register');
                }} 
                className="w-full mt-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Hợp tác mở quán F&B</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* GREEN IMPACT PANEL */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual Panel (Left) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center border-b border-slate-800/80 pb-4.5">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-500 font-bold ml-2 tracking-wider uppercase">Tác động xanh của Campus (Demo)</span>
                </div>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-black uppercase">
                  Trực tuyến
                </span>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-900/50 p-4.5 rounded-2xl border border-slate-800">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Món ăn cứu trợ</span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">1,248 phần</span>
                  <span className="text-[9px] text-emerald-500 font-medium flex items-center mt-1">↑ 12% tuần này</span>
                </div>
                <div className="bg-slate-900/50 p-4.5 rounded-2xl border border-slate-800">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Giảm khí thải</span>
                  <span className="text-2xl font-black text-teal-400 mt-1 block">3.1 tấn</span>
                  <span className="text-[9px] text-slate-500 font-medium block mt-1">Quy đổi khí CO2</span>
                </div>
                <div className="bg-slate-900/50 p-4.5 rounded-2xl border border-slate-800">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Ngân sách cứu</span>
                  <span className="text-2xl font-black text-orange-400 mt-1 block">12.5tr đ</span>
                  <span className="text-[9px] text-slate-500 block mt-1">Tiết kiệm bởi SV</span>
                </div>
                <div className="bg-slate-900/50 p-4.5 rounded-2xl border border-slate-800">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Phản hồi xấu</span>
                  <span className="text-2xl font-black text-rose-500 mt-1 block">0.8%</span>
                  <span className="text-[9px] text-slate-500 block mt-1">Vượt chuẩn an toàn</span>
                </div>
              </div>

              {/* Graphic Chart simulation */}
              <div className="bg-slate-900/30 p-4.5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center text-xs text-slate-400">
                  <span className="font-bold flex items-center"><Activity className="w-4 h-4 mr-1 text-emerald-400" /> Bản đồ phân bố lượng dư thực phẩm</span>
                  <span className="text-slate-500 text-[10px]">Cập nhật 5 phút trước</span>
                </div>
                
                <div className="h-28 flex items-end justify-between space-x-2 pt-4 border-b border-slate-800/60">
                  <div className="w-full bg-slate-900/80 rounded-t h-[40%] relative"><span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] text-slate-600 mb-1">11h</span></div>
                  <div className="w-full bg-slate-900/80 rounded-t h-[60%] relative"><span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] text-slate-600 mb-1">13h</span></div>
                  <div className="w-full bg-slate-900/80 rounded-t h-[75%] relative"><span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] text-slate-600 mb-1">15h</span></div>
                  <div className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t h-[95%] relative"><span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] text-emerald-400 font-bold mb-1">17h</span></div>
                  <div className="w-full bg-slate-900/80 rounded-t h-[30%] relative"><span className="absolute bottom-full left-1/2 -translate-x-1/2 text-[8px] text-slate-600 mb-1">19h</span></div>
                </div>
                
                <p className="text-[10px] text-slate-500 leading-normal flex items-start">
                  <AlertCircle className="w-4 h-4 text-emerald-500 shrink-0 mr-1.5 mt-0.5" />
                  <span>Dự báo AI: Lượng tồn dư đạt cao điểm lúc 17:00. Nền tảng đã kích hoạt gửi thông báo gợi ý điều phối sớm 30 phút cho các quán đối tác trong bán kính 300m.</span>
                </p>
              </div>
            </div>

            {/* Content (Right) */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Hệ sinh thái xanh</span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                Quản trị tác động bền vững
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Chúng tôi không chỉ giúp bán món ăn giảm giá. Mục tiêu cuối cùng là xây dựng nền tảng minh bạch dữ liệu, hỗ trợ nhà trường và doanh nghiệp cùng định lượng rõ rệt mức độ giảm thiểu phát thải rác thải hữu cơ.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Theo dõi lượng metan và khí cacbonic tiết giảm từ thức ăn được cứu.</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Hỗ trợ các báo cáo số liệu phát triển bền vững (ESG) cho nhà trường.</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span>Tạo lập môi trường kinh doanh minh bạch và trách nhiệm hơn.</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA WAITLIST FORM SECTION */}
      <section id="register" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-800/80 relative overflow-hidden">
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 rounded-full bg-emerald-500/5 blur-[100px]" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
          
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">Tham gia cùng chúng tôi</span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight max-w-2xl mx-auto">
              Đồng hành cùng GreenBiteAI
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Nhận thông báo mời trải nghiệm phiên bản thử nghiệm (pilot) sớm nhất ngay khi hệ thống triển khai quanh trường của bạn.
            </p>
          </div>

          {/* Toggle Role Button */}
          <div className="inline-flex p-1 bg-slate-950 rounded-2xl border border-slate-800/80">
            <button 
              onClick={() => {
                setRole('student');
                setIsSubmitted(false);
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${role === 'student' ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Tôi là sinh viên
            </button>
            <button 
              onClick={() => {
                setRole('merchant');
                setIsSubmitted(false);
              }}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${role === 'merchant' ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Tôi là quán F&B
            </button>
          </div>

          {/* Form */}
          <div className="bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 max-w-md mx-auto text-left shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6.5 h-6.5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white">Đăng ký thành công!</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    GreenBiteAI đã ghi nhận thông tin đăng ký của bạn. Chúng tôi sẽ sớm gửi lời mời trải nghiệm tới email **{email}**.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setStoreName('');
                  }}
                  className="text-xs text-emerald-400 hover:underline font-bold"
                >
                  Nhập thông tin khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Họ và tên</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'student' ? 'Họ và tên của bạn' : 'Tên đại diện quán ăn'} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Địa chỉ Email</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@student.vn hoặc email quán" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                {role === 'merchant' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tên quán ăn / Vị trí</label>
                    <input 
                      type="text" 
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Ví dụ: Căn tin khu A, Cơm gà cổng 3..." 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Số điện thoại liên hệ</label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Không bắt buộc" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full mt-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/10 flex items-center justify-center space-x-2"
                >
                  <span>Đăng ký danh sách chờ (Waitlist)</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-500 border-t border-slate-900 py-16 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-4 gap-8 pb-12 border-b border-slate-900">
            {/* Brand Logo Info */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
                  <Leaf className="w-4.5 h-4.5 text-slate-950" />
                </div>
                <span className="text-lg font-black tracking-tight text-white">
                  GreenBite<span className="text-emerald-400 font-extrabold">AI</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Smart Food Rescue Platform for Campus F&B. Dự án chuyển đổi số và giải cứu thực phẩm bền vững quanh trường đại học.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Thông tin thêm</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li><button onClick={() => scrollToSection('problem')} className="hover:text-emerald-400 transition-colors">Thực trạng vấn đề</button></li>
                <li><button onClick={() => scrollToSection('timing')} className="hover:text-emerald-400 transition-colors">Thời điểm Why Now</button></li>
                <li><button onClick={() => scrollToSection('solution')} className="hover:text-emerald-400 transition-colors">Giải pháp đề xuất</button></li>
                <li><button onClick={() => scrollToSection('features')} className="hover:text-emerald-400 transition-colors">Cốt lõi công nghệ</button></li>
                <li><button onClick={() => scrollToSection('ai-demo')} className="hover:text-emerald-400 transition-colors">Giả lập Demo AI</button></li>
                <li><button onClick={() => scrollToSection('business')} className="hover:text-emerald-400 transition-colors">Mô hình kinh doanh</button></li>
                <li><button onClick={() => scrollToSection('roadmap')} className="hover:text-emerald-400 transition-colors">Lộ trình giải cứu</button></li>
              </ul>
            </div>

            {/* Team Contact */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Liên hệ dự án</h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>support@greenbiteai.vn</span>
                </li>
                <li>HUIT Startup 2026</li>
                <li>Đại học Công thương TP.HCM</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-600 space-y-4 sm:space-y-0">
            <p>© 2026 GreenBiteAI. All rights reserved. Phát triển bởi HUIT Startup Team.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">Điều khoản dịch vụ</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Chính sách bảo mật</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
