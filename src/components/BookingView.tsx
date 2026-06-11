import React, { useState, useEffect } from 'react';
import { Calendar, User, Mail, DollarSign, CloudRain, Sun, Leaf, BadgeCheck, Trash2, Check, RefreshCw, QrCode, Printer, Download, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { Booking, WeatherData } from '../types';
import { INITIAL_WEATHER } from '../data';

export default function BookingView() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitors, setVisitors] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('Standard Entry');
  
  // Storage states
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [scannedBookingId, setScannedBookingId] = useState<string | null>(null);

  const selectedBooking = myBookings.find(b => b.id === activeBookingId) || myBookings[0];

  // Weather state
  const [weather, setWeather] = useState<WeatherData>(INITIAL_WEATHER);
  const [isWeatherRefreshing, setIsWeatherRefreshing] = useState(false);

  // Package definitions
  const packages = [
    { name: 'Standard Entry', price: 300, description: 'Basic entrance access + standard lifejacket' },
    { name: 'Adventure Bundle', price: 550, description: 'Entrance + custom cliff guide + GoPro clip' },
    { name: 'Exclusive Private Tour', price: 1200, description: 'Private guide + custom village lunch + early entry' }
  ];

  // Load existing bookings
  useEffect(() => {
    const saved = localStorage.getItem('waterfall_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const getPackagePrice = () => {
    const pk = packages.find(p => p.name === selectedPackage);
    return pk ? pk.price : 300;
  };

  const getSubtotal = () => {
    return getPackagePrice() * visitors;
  };

  const getTax = () => {
    // 40 per person conservation tax
    return 40 * visitors;
  };

  const getTotalPrice = () => {
    return getSubtotal() + getTax();
  };

  const handleRefreshWeather = () => {
    setIsWeatherRefreshing(true);
    setTimeout(() => {
      // Small simulated updates
      const tempFluctuation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
      const humidityFluctuation = Math.floor(Math.random() * 5) - 2;
      setWeather(prev => ({
        ...prev,
        temp: 24 + tempFluctuation,
        humidity: Math.min(100, Math.max(50, prev.humidity + humidityFluctuation)),
        updatedAt: `Updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
      }));
      setIsWeatherRefreshing(false);
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !visitDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const newBooking: Booking = {
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      email,
      visitDate,
      visitors: Number(visitors),
      packageName: selectedPackage,
      totalPrice: getTotalPrice(),
      conservationTax: getTax(),
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...myBookings];
    setMyBookings(updated);
    localStorage.setItem('waterfall_bookings', JSON.stringify(updated));

    // Focus on success
    setActiveBookingId(newBooking.id);
    setIsSuccess(true);
    
    // Clear inputs
    setFullName('');
    setEmail('');
    setVisitDate('');
    setVisitors(1);
    setSelectedPackage('Standard Entry');
  };

  const handleDeleteBooking = (id: string) => {
    const updated = myBookings.filter(b => b.id !== id);
    setMyBookings(updated);
    localStorage.setItem('waterfall_bookings', JSON.stringify(updated));
    if (activeBookingId === id) {
      setActiveBookingId(null);
    }
  };

  return (
    <div id="booking-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20 font-sans animate-fade-in">
      
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-mono font-bold tracking-widest text-forest-600 uppercase">
          Pass Issuance Bureau
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-forest-900 leading-tight">
          Secure Your Sanctuary
        </h2>
        <p className="text-xs sm:text-sm text-forest-700 font-light leading-relaxed">
          Daily entry is strictly capped at 80 slots to respect and preserve the land. Your conservation tax is wired straight to village restoration projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Intake Details Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-forest-100 shadow-sm space-y-6">
          <h3 className="font-serif text-xl font-bold text-forest-950 flex items-center">
            <BadgeCheck className="h-5 w-5 text-forest-600 mr-2" />
            Visitor Permits Intake Form
          </h3>

          <form id="booking-permit-form" onSubmit={handleFormSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label htmlFor="fullname" className="block text-xs font-semibold text-forest-800 font-mono uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-forest-400 pointer-events-none">
                  <User className="h-4 w-4" />
                </span>
                <input 
                  type="text" 
                  id="fullname"
                  required
                  placeholder="e.g. Liam Christopher"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold text-forest-800 font-mono uppercase tracking-wider">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-forest-400 pointer-events-none">
                  <Mail className="h-4 w-4" />
                </span>
                <input 
                  type="email" 
                  id="email"
                  required
                  placeholder="e.g. liam@naturelovers.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 placeholder-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Visit Date */}
              <div className="space-y-1">
                <label htmlFor="visit-date" className="block text-xs font-semibold text-forest-800 font-mono uppercase tracking-wider">
                  Visit Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-forest-400 pointer-events-none">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <input 
                    type="date" 
                    id="visit-date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Total Visitors */}
              <div className="space-y-1">
                <label htmlFor="visitors-count" className="block text-xs font-semibold text-forest-800 font-mono uppercase tracking-wider">
                  Total Visitors <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  id="visitors-count"
                  required
                  min="1"
                  max="12"
                  value={visitors}
                  onChange={(e) => setVisitors(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-3 bg-warm-50 border border-forest-150 rounded-xl text-sm text-forest-950 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Tour Pack selection */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-semibold text-forest-800 font-mono uppercase tracking-wider">
                Select Your Sanctuary Package
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {packages.map((pk) => {
                  const isSel = selectedPackage === pk.name;
                  return (
                    <div 
                      key={pk.name}
                      onClick={() => setSelectedPackage(pk.name)}
                      className={`p-4 rounded-xl border cursor-pointer hover:border-forest-300 transition-all ${
                        isSel 
                          ? 'border-forest-600 bg-forest-50 ring-2 ring-forest-500/20' 
                          : 'border-forest-100 bg-warm-50/50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-serif font-bold text-sm text-forest-950">
                          {pk.name}
                        </span>
                        <span className="text-sm font-mono font-bold text-forest-800">
                          ₹{pk.price} <span className="text-[10px] text-forest-500 font-light">/ person</span>
                        </span>
                      </div>
                      <p className="text-xs text-forest-600 font-light leading-snug">
                        {pk.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                id="booking-form-submit-btn"
                className="w-full py-4 bg-forest-700 text-warm-50 rounded-xl font-semibold hover:bg-forest-800 active:scale-[0.99] shadow transition-all tracking-wide text-sm"
              >
                Generate Certified Entry Permit
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Pricing & Real-Time Weather Widgets */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dynamic Price Breakdown Card */}
          <div id="price-card" className="bg-forest-900 text-white rounded-2xl p-6 border border-forest-800 shadow-md space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-white/5 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-warm-300 uppercase tracking-widest">
                Breakdown of Charges
              </span>
              <h3 className="font-serif text-lg font-bold">Standard Entry Pricing</h3>
            </div>

            <div className="space-y-3.5 border-t border-forest-800 pt-4 text-sm font-light">
              <div className="flex justify-between text-forest-200">
                <span>{selectedPackage} x {visitors}</span>
                <span className="font-mono text-white">₹{getSubtotal().toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between text-forest-200">
                <span>Conservation Tax / Cleaning Fee</span>
                <span className="font-mono text-white">₹{getTax().toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-forest-200 text-xs italic">
                <span>* Capped environmental security contribution</span>
                <span>Included</span>
              </div>

              <div className="pt-4 border-t border-forest-800 flex justify-between items-baseline">
                <span className="font-serif font-semibold text-base text-warm-100">Total Price</span>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400">
                  ₹{getTotalPrice().toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 bg-forest-950/50 rounded-xl border border-forest-800/80 flex items-start space-x-2.5">
              <Leaf className="h-4.5 w-4.5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-forest-300 leading-normal font-light">
                This transaction preserves the pristine state of Purok 4. We do not use commercial plastic cups or synthetic items inside the gate limits.
              </p>
            </div>
          </div>

          {/* Monsoon Mist Weather Widget */}
          <div id="weather-widget" className="bg-warm-100 rounded-2xl p-6 border border-forest-150 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-forest-500 uppercase tracking-widest">
                  Sanctuary Live Weather
                </span>
                <h4 className="font-serif text-base font-bold text-forest-900">Monsoon Mist Status</h4>
              </div>
              <button 
                onClick={handleRefreshWeather}
                disabled={isWeatherRefreshing}
                className="p-1.5 rounded-lg bg-white border border-forest-100 text-forest-600 hover:text-forest-900 hover:bg-forest-50 transition-colors disabled:opacity-50"
                title="Refresh Status"
              >
                <RefreshCw className={`h-4 w-4 ${isWeatherRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center pt-2">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-700">
                  {weather.rainProbability > 50 ? (
                    <CloudRain className="h-6 w-6 text-sky-500" />
                  ) : (
                    <Sun className="h-6 w-6 text-amber-500" />
                  )}
                </div>
                <div>
                  <span className="text-xs text-forest-500 font-mono">Current Temp</span>
                  <p className="text-xl font-bold font-serif text-forest-900">{weather.temp}°C</p>
                </div>
              </div>

              <div className="space-y-1 text-right text-xs">
                <div className="text-forest-700">Rain Prob: <strong>{weather.rainProbability}%</strong></div>
                <div className="text-forest-700">Humidity: <strong>{weather.humidity}%</strong></div>
              </div>
            </div>

            <p className="text-xs text-forest-800 leading-relaxed font-light italic bg-white p-3 rounded-xl border border-forest-50">
              &ldquo;{weather.description}&rdquo;
            </p>

            <div className="flex justify-between items-center text-[10px] font-mono text-forest-500">
              <span className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                Diving status: Safe
              </span>
              <span>{weather.updatedAt}</span>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Elegant Admission Voucher Boarding Pass */}
      {selectedBooking && (
        <div id="booking-receipt-boarding-pass" className="mt-16 space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#10b981] uppercase flex items-center">
                <Ticket className="h-4 w-4 mr-1.5" /> Eco-Permit Voucher
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950">
                Pristine Forest Admission Pass
              </h3>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  window.print();
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-forest-200 hover:bg-forest-50 hover:border-forest-400 text-forest-700 text-xs font-mono rounded-xl transition-all cursor-pointer"
                title="Print Admission Ticket"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Pass</span>
              </button>

              <button 
                onClick={() => {
                  // Simulate File download
                  const content = `SECRET PLACE WATERFALL RESERVATION\nCode: ${selectedBooking.id}\nHolder: ${selectedBooking.fullName}\nDate: ${selectedBooking.visitDate}\nVisitors: ${selectedBooking.visitors}\nPackage: ${selectedBooking.packageName}\nPrice: ₹${selectedBooking.totalPrice}\nSigned: Chief Ranger Alon Tagalog`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `waterfall_permit_${selectedBooking.id}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-white border border-forest-200 hover:bg-forest-50 hover:border-forest-400 text-forest-700 text-xs font-mono rounded-xl transition-all cursor-pointer"
                title="Download Permit Data"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Stub</span>
              </button>
            </div>
          </div>

          {/* Physical Ticket Body Mockup */}
          <div className="bg-white rounded-3xl border border-forest-150 overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 relative">
            
            {/* Decorative semicircles indicating a theater or boarding cut ticket stub (CSS) */}
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[74.5%] w-6 h-12 bg-warm-50 border-r border-y border-forest-150 rounded-r-full z-10" />
            <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-[75.5%] w-6 h-12 bg-warm-50 border-l border-y border-forest-150 rounded-l-full z-10" />

            {/* Left Portion of Pass (Admission details) */}
            <div className="lg:col-span-9 p-6 sm:p-8 space-y-6 lg:border-r lg:border-dashed lg:border-forest-200 relative bg-linear-to-br from-white to-warm-50/40">
              
              {/* Ticket heading stamps */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-forest-100 pb-5">
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 mt-1 shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-wider block">
                      Environment Office Registered
                    </span>
                    <h4 className="font-serif text-lg font-bold text-forest-950 leading-tight">
                      Vile Village Conservation Pass
                    </h4>
                    <span className="text-[10px] font-mono text-forest-500">
                      Standard Issue Level-A Gate Permit
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1 font-mono text-xs text-forest-600">
                  <div>Status: <span className="text-emerald-600 font-bold uppercase">● APPROVED</span></div>
                  <div>Issued: <span>{new Date(selectedBooking.createdAt).toLocaleDateString()}</span></div>
                  <div>Security check: <span className="text-[#10b981] font-semibold">Passed</span></div>
                </div>
              </div>

              {/* Data fields grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-forest-450 uppercase tracking-wider">Permit holder</span>
                  <strong className="block text-forest-900 font-semibold">{selectedBooking.fullName}</strong>
                  <span className="block text-xs text-forest-500 font-light truncate">{selectedBooking.email}</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-forest-450 uppercase tracking-wider">Scheduled Date</span>
                  <strong className="block text-forest-900 font-semibold">
                    {new Date(selectedBooking.visitDate).toLocaleDateString(undefined, {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})}
                  </strong>
                  <span className="block text-xs text-forest-500 font-light">Valid all day from 06:00 AM</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-forest-450 uppercase tracking-wider">Capped capacity</span>
                  <strong className="block text-forest-900 font-semibold">{selectedBooking.visitors} Persons Max</strong>
                  <span className="block text-xs text-forest-500 font-light">Includes village lifevests</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-forest-450 uppercase tracking-wider">Sanctuary Package</span>
                  <strong className="block text-forest-900 font-semibold">{selectedBooking.packageName}</strong>
                  <span className="block text-xs text-forest-500 font-light">Guide allocation approved</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-forest-450 uppercase tracking-wider">Ecosystem Levy</span>
                  <strong className="block text-forest-900 font-mono text-emerald-700">₹{selectedBooking.totalPrice.toLocaleString()}</strong>
                  <span className="block text-[10px] text-emerald-600 font-light font-mono">Paid (₹{selectedBooking.conservationTax} Conservation Tax)</span>
                </div>

                <div className="space-y-1">
                  <span className="block text-[10px] font-mono text-forest-450 uppercase tracking-wider">Permit serial</span>
                  <strong className="block text-forest-950 font-mono tracking-tight text-sm font-bold uppercase">{selectedBooking.id}</strong>
                  <span className="block text-[10px] text-forest-500 font-light font-mono">L-80 Slot limit verified</span>
                </div>
              </div>

              {/* Eco Code conditions list */}
              <div className="bg-forest-50 rounded-2xl p-4.5 border border-forest-150 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-forest-700 uppercase tracking-widest font-bold block">
                    Pre-Admittance Mandates:
                  </span>
                  <ul className="text-[11px] text-forest-800 space-y-1.5 font-light">
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 shrink-0" />
                      Strictly zero single-use plastics allowed beyond checkpoint.
                    </li>
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 shrink-0" />
                      Must present this slip to Chief Warden Alon Tagalog at Gate.
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-forest-700 uppercase tracking-widest font-bold block">
                    Village Ward Service Notes:
                  </span>
                  <p className="text-[11px] text-forest-700 leading-normal font-light">
                    Your guide Santi will meet you at the Purok 4 Base Registration Hut. Safe lifejackets, helmets, and organic spring coconuts are pre-staged in your name.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Portion / Coupon Stub (Barcode, QR code, live validator click) */}
            <div className="lg:col-span-3 p-6 sm:p-8 bg-forest-900 text-white flex flex-col justify-between items-center text-center space-y-5 relative">
              <div className="absolute inset-0 bg-linear-to-b from-forest-850 to-forest-950 pointer-events-none" />
              
              <div className="relative z-10 w-full space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                  Electronic Gate Permit
                </span>
                <span className="text-xs font-mono font-bold block tracking-tight">Voucher Coupon Stub</span>
              </div>

              {/* Interactive QR/Barcode container with live gate validation state indicator */}
              <div className="relative z-10 flex flex-col items-center space-y-2 w-full">
                <div 
                  onClick={() => {
                    setScannedBookingId(scannedBookingId === selectedBooking.id ? null : selectedBooking.id);
                  }}
                  className={`bg-white p-3 rounded-2xl border cursor-pointer hover:scale-103 active:scale-98 transition-all flex flex-col items-center ${
                    scannedBookingId === selectedBooking.id 
                      ? 'border-emerald-500 shadow-lg ring-4 ring-emerald-500/20' 
                      : 'border-forest-700'
                  }`}
                  title="Validate Permit Code"
                >
                  <QrCode className={`h-24 w-24 text-forest-950 transition-transform ${scannedBookingId === selectedBooking.id ? 'scale-102' : ''}`} />
                  
                  {/* Pseudo Barcode block */}
                  <div className="w-full h-5 mt-3 flex items-center justify-between gap-[1.5px] bg-white px-2">
                    <div className="w-1.5 h-full bg-forest-950" />
                    <div className="w-[1px] h-full bg-forest-950" />
                    <div className="w-[3px] h-full bg-forest-950" />
                    <div className="w-1 h-full bg-forest-950" />
                    <div className="w-[1.5px] h-full bg-forest-950" />
                    <div className="w-0.5 h-full bg-forest-950" />
                    <div className="w-[4px] h-full bg-forest-950" />
                    <div className="w-[1px] h-full bg-forest-950" />
                    <div className="w-1.5 h-full bg-forest-950" />
                    <div className="w-[2px] h-full bg-forest-950" />
                    <div className="w-[3px] h-full bg-forest-950" />
                    <div className="w-1 h-full bg-forest-950" />
                    <div className="w-1.5 h-full bg-forest-950" />
                  </div>
                  
                  <span className="text-[9px] font-mono text-forest-500 tracking-widest uppercase mt-1 font-bold">
                    {selectedBooking.id}
                  </span>
                </div>

                <span className="text-[9px] font-mono text-emerald-300 font-light">
                  Click barcode to trigger gate validation
                </span>
              </div>

              {/* live validation scan status banner */}
              <div className="relative z-10 w-full">
                {scannedBookingId === selectedBooking.id ? (
                  <div className="bg-emerald-500/15 border border-emerald-500/30 p-2 rounded-xl text-[10px] font-mono text-emerald-300 animate-fade-in">
                    ✓ Code validated by Chief Ranger! approved entry to the primary gorge.
                  </div>
                ) : (
                  <div className="bg-forest-950/45 border border-forest-800 p-2 rounded-xl text-[10px] font-mono text-forest-400">
                    Scanner status: Ready at gate
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* Booked Certificates Roll - Local Persistence Dashboard */}
      {myBookings.length > 0 && (
        <div id="booking-history-dashboard" className="mt-16 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950">
                My Registered Permits ({myBookings.length})
              </h3>
              <p className="text-xs text-forest-500 font-light">
                Stored locally on this web engine client session. Click on any certificate coupon card below to view its official live Boarding Pass!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myBookings.map((b) => {
              const matchesSelected = (activeBookingId === b.id) || (!activeBookingId && myBookings[0]?.id === b.id);
              return (
                <div 
                  key={b.id} 
                  onClick={() => {
                    setActiveBookingId(b.id);
                    setIsSuccess(true);
                  }}
                  className={`bg-white rounded-2xl p-5 border cursor-pointer hover:border-forest-300 transition-all flex flex-col justify-between ${
                    matchesSelected 
                      ? 'border-forest-500 ring-2 ring-forest-500/20 bg-forest-50/20' 
                      : 'border-forest-100 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[9px] font-mono text-forest-400">PERMIT CODE</span>
                        <h4 className="font-mono text-sm font-bold text-forest-900">{b.id}</h4>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold rounded-lg border border-emerald-100 uppercase">
                        Approved
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[9px] font-mono text-forest-400 block">HOLDER</span>
                        <span className="font-semibold text-forest-800 block truncate">{b.fullName}</span>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono text-forest-400 block">VISIT DATE</span>
                        <span className="font-semibold text-forest-800 block">{b.visitDate}</span>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono text-forest-400 block">CAPACITY</span>
                        <span className="font-semibold text-forest-800 block">{b.visitors} Visitors</span>
                      </div>

                      <div>
                        <span className="text-[9px] font-mono text-forest-400 block">FEE</span>
                        <span className="font-mono font-semibold text-forest-900 block">₹{b.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-forest-50 flex justify-between items-center text-[10px] text-forest-500">
                    <span>Registered: {new Date(b.createdAt).toLocaleDateString()}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering card selection
                        handleDeleteBooking(b.id);
                      }}
                      className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Cancel Permit"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
