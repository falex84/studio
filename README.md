<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AlexPC | Hardware & Soporte Técnico Inteligente</title>
    
    <!-- Meta Tags SEO -->
    <meta name="description" content="Venta de hardware premium y soporte técnico especializado con IA AlexPC.">
    
    <!-- Fuentes: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    
    <!-- jsPDF para generación de documentos -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'brand-blue': '#0038A8',
                        'brand-dark': '#1a1a1a',
                        'brand-gray': '#333333',
                        'tech-black': '#0a0a0a',
                        'tech-text': '#f5f5f7',
                        'tech-muted': '#86868b'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>

    <style>
        body {
            background-color: #0a0a0a;
            color: #f5f5f7;
            -webkit-font-smoothing: antialiased;
        }

        .scroll-reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.2, 1, 0.3, 1);
        }

        .scroll-reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .glass-nav {
            background: rgba(10, 10, 10, 0.85);
            backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 1px solid rgba(0, 56, 168, 0.2);
        }

        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
            animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .input-premium {
            background: #1a1a1a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s;
        }
        .input-premium:focus {
            border-color: #0038A8;
            outline: none;
            box-shadow: 0 0 15px rgba(0, 56, 168, 0.2);
            background: #1e1e1e;
        }

        .checkout-input {
            width: 100%;
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 8px 12px;
            font-size: 10px;
            color: white;
            transition: border-color 0.3s;
        }
        .checkout-input:focus {
            border-color: #0038A8;
            outline: none;
        }

        .payment-opt.selected {
            border-color: #0038A8;
            background: rgba(0, 56, 168, 0.15);
        }

        .logo-img {
            height: 45px;
            width: auto;
            filter: drop-shadow(0 0 5px rgba(0, 56, 168, 0.4));
        }

        .hero-gradient {
            background: radial-gradient(circle at center, rgba(0, 56, 168, 0.15) 0%, transparent 70%);
        }

        .product-card {
            background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
            border: 1px solid rgba(255, 255, 255, 0.03);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-card:hover {
            border-color: rgba(0, 56, 168, 0.4);
            transform: translateY(-5px);
            box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
        }

        .custom-scroll::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.02);
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(0, 56, 168, 0.3);
            border-radius: 10px;
        }

        .shimmer {
            background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    </style>
</head>
<body class="font-sans overflow-x-hidden">

    <!-- Navegación -->
    <nav class="fixed top-0 w-full z-50 glass-nav">
        <div class="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3 cursor-pointer" onclick="showTab('inicio')">
                <img src="https://api.dicebear.com/7.x/initials/svg?seed=AlexPC&backgroundColor=0038a8" alt="AlexPC Logo" class="logo-img rounded-lg">
                <div class="text-xl md:text-2xl font-extrabold tracking-tighter uppercase hidden xs:block">
                    AlexPC<span class="text-brand-blue">.</span>
                </div>
            </div>
            
            <div class="hidden md:flex space-x-8 text-[10px] font-bold tracking-widest uppercase">
                <button onclick="showTab('inicio')" class="hover:text-brand-blue transition-colors">Inicio</button>
                <button onclick="showTab('shop')" class="hover:text-brand-blue transition-colors">Tienda</button>
                <button onclick="showTab('tickets')" class="hover:text-brand-blue transition-colors">Tickets</button>
            </div>

            <div class="flex items-center space-x-3 md:space-x-6">
                <button onclick="openCart()" class="relative p-2 text-tech-text hover:text-brand-blue transition-colors">
                    <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                    <span id="cart-count" class="absolute top-0 right-0 bg-brand-blue text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
                </button>
                <a href="https://wa.me/584142938683" target="_blank" class="bg-brand-blue text-white px-4 md:px-6 py-2.5 rounded-full text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-brand-blue/20">
                    WhatsApp
                </a>
            </div>
        </div>
    </nav>

    <main class="pt-20">
        <!-- SECCIÓN: INICIO -->
        <div id="inicio" class="tab-content active hero-gradient">
            <section class="min-h-[85vh] flex flex-col justify-center items-center px-6 text-center">
                <div class="scroll-reveal visible">
                    <span class="inline-block px-4 py-1.5 mb-6 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase border border-brand-blue text-brand-blue rounded-full bg-brand-blue/5">
                        Potencia y Rendimiento Garantizado
                    </span>
                    <h1 class="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
                        Hardware de <br> <span class="text-brand-blue">Alta Gama.</span>
                    </h1>
                    <p class="max-w-2xl mx-auto text-tech-muted text-base md:text-xl mb-10 font-light px-4">
                        Expertos en ensamblaje y soporte técnico. Paga en Bolívares a tasa oficial BCV con total transparencia.
                    </p>
                    <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
                        <button onclick="showTab('shop')" class="bg-brand-blue text-white px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest active:scale-95 transition-all shadow-xl shadow-brand-blue/30">
                            Explorar Tienda
                        </button>
                        <button onclick="showTab('tickets')" class="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">
                            Soporte Técnico
                        </button>
                    </div>
                </div>
            </section>
        </div>

        <!-- SECCIÓN: SHOP -->
        <div id="shop" class="tab-content">
            <section class="py-12 md:py-20 px-4 md:px-6 max-w-7xl mx-auto">
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 border-l-4 border-brand-blue pl-6 gap-4">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-extrabold tracking-tighter mb-2 uppercase italic">Catálogo <span class="text-brand-blue">Stock Real</span></h2>
                        <p class="text-tech-muted text-[10px] md:text-xs font-light uppercase tracking-[0.2em]">Envíos seguros a nivel nacional • Precios en USD</p>
                    </div>
                </div>
                <div id="product-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 md:gap-8"></div>
            </section>
        </div>

        <!-- SECCIÓN: TICKETS -->
        <div id="tickets" class="tab-content relative overflow-hidden">
            <section class="py-12 md:py-20 px-4 md:px-6 max-w-5xl mx-auto relative z-10">
                <div class="text-center mb-10 md:mb-16">
                    <span class="inline-flex items-center gap-2 text-brand-blue text-[9px] font-black uppercase tracking-[0.3em] mb-4">
                        <i data-lucide="help-circle" class="w-3 h-3"></i> Canal de Ayuda
                    </span>
                    <h2 class="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 uppercase italic">Ticket de <span class="text-brand-blue">Servicio</span></h2>
                    <p class="text-tech-muted text-xs md:text-sm max-w-lg mx-auto font-light">
                        ¿Problemas con tu equipo? Completa los datos y nuestra IA te dará un diagnóstico preliminar.
                    </p>
                </div>

                <div class="bg-brand-dark/50 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-14 border border-white/5 shadow-2xl">
                    <form id="ticketForm" class="space-y-8">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="space-y-3">
                                <label class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-tech-muted ml-1">
                                    <i data-lucide="user" class="w-3 h-3"></i> Tu Nombre
                                </label>
                                <input type="text" id="ticketNombre" required 
                                    class="w-full px-5 py-4 rounded-2xl input-premium text-sm placeholder:text-white/10" 
                                    placeholder="Ej: Alejandro Pérez">
                            </div>
                            <div class="space-y-3">
                                <label class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-tech-muted ml-1">
                                    <i data-lucide="mail" class="w-3 h-3"></i> Correo Electrónico
                                </label>
                                <input type="email" id="ticketEmail" required 
                                    class="w-full px-5 py-4 rounded-2xl input-premium text-sm placeholder:text-white/10" 
                                    placeholder="correo@ejemplo.com">
                            </div>
                        </div>

                        <div class="space-y-3">
                            <label class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-tech-muted ml-1">
                                <i data-lucide="settings" class="w-3 h-3"></i> Tipo de Falla
                            </label>
                            <select id="ticketTipo" class="w-full px-5 py-4 rounded-2xl input-premium text-sm appearance-none cursor-pointer">
                                <option value="Falla de Hardware">Falla de Hardware</option>
                                <option value="Mantenimiento / Software">Mantenimiento / Software</option>
                                <option value="Presupuesto Ensamblaje">Presupuesto Ensamblaje</option>
                                <option value="Otro Motivo">Otro Motivo</option>
                            </select>
                        </div>

                        <div class="space-y-3">
                            <label class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-tech-muted ml-1">
                                <i data-lucide="message-square" class="w-3 h-3"></i> Descripción del problema
                            </label>
                            <textarea id="ticketMensaje" rows="5" required 
                                class="w-full px-5 py-4 rounded-2xl input-premium text-sm placeholder:text-white/10 resize-none" 
                                placeholder="Cuéntanos qué sucede..."></textarea>
                        </div>

                        <!-- Caja de Diagnóstico IA -->
                        <div id="aiDiagnosticBox" class="hidden">
                            <div class="p-6 rounded-2xl bg-brand-blue/10 border border-brand-blue/30 relative overflow-hidden">
                                <div class="flex justify-between items-center mb-3">
                                    <div class="flex items-center gap-2 text-brand-blue text-[10px] font-black uppercase">
                                        <i data-lucide="bot" class="w-4 h-4"></i> Diagnóstico IA AlexPC ✨
                                    </div>
                                    <div id="ticketNumberDisplay" class="text-brand-blue font-mono text-xs font-bold">#0001</div>
                                </div>
                                <div id="aiDiagnosticText" class="text-xs text-tech-text leading-relaxed font-light mb-4"></div>
                                <div class="flex items-center gap-3">
                                    <button type="button" onclick="generatePDF()" class="bg-brand-blue/20 hover:bg-brand-blue text-brand-blue hover:text-white border border-brand-blue/30 px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                                        <i data-lucide="file-text" class="w-3 h-3"></i> Descargar PDF
                                    </button>
                                    <span class="text-[8px] text-tech-muted uppercase font-bold tracking-widest italic">Recuerda adjuntar el PDF manualmente en WA</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4 pt-4">
                            <button type="button" onclick="diagnoseIssue()" id="btnDiagnose"
                                class="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all hover:bg-white/10 flex items-center justify-center gap-3">
                                <i data-lucide="brain-circuit" class="w-4 h-4"></i> Consulta de falla ✨
                            </button>
                            <button type="button" onclick="submitTicket()" id="btnSubmitTicket"
                                class="flex-1 bg-brand-blue text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all hover:brightness-110 active:scale-[0.98] shadow-2xl shadow-brand-blue/30 flex items-center justify-center gap-3">
                                Enviar a Soporte (WA)
                                <i data-lucide="arrow-right" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </main>

    <!-- CHECKOUT MODAL -->
    <div id="checkoutModal" class="fixed inset-0 z-[100] hidden flex items-center justify-center p-2 sm:p-6 bg-black/95">
        <div class="bg-brand-dark w-full max-w-6xl rounded-[25px] md:rounded-[40px] border border-brand-blue/20 shadow-2xl overflow-hidden flex flex-col md:flex-row h-full max-h-[92vh]">
            <div class="w-full md:w-5/12 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col shrink-0 md:shrink">
                <div class="flex justify-between items-center mb-4 md:mb-6">
                    <h3 class="text-xl md:text-3xl font-black uppercase tracking-tighter">Tu Compra</h3>
                    <button onclick="closeCart()" class="md:hidden text-tech-muted"><i data-lucide="x" class="w-6 h-6"></i></button>
                </div>
                <div id="cart-items" class="max-h-[22vh] md:max-h-full md:flex-grow space-y-3 mb-4 md:mb-6 overflow-y-auto pr-2 custom-scroll"></div>
                <div class="pt-4 border-t border-white/10 mt-auto">
                    <div class="flex justify-between items-center mb-2">
                        <span class="text-tech-muted uppercase font-bold text-[9px] tracking-widest">Tasa BCV Oficial</span>
                        <div class="flex items-center gap-2">
                            <span id="tasa-bcv-display" class="text-brand-blue text-[10px] font-mono font-bold tracking-tighter italic">Cargando...</span>
                            <button onclick="fetchTasaBCV()" class="text-tech-muted hover:text-brand-blue transition-colors">
                                <i data-lucide="refresh-cw" class="w-2.5 h-2.5"></i>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between items-end mb-2">
                        <span class="text-tech-muted uppercase font-bold text-[9px] tracking-widest">Subtotal USD</span>
                        <span id="cart-total" class="text-white text-2xl md:text-3xl font-black">$0.00</span>
                    </div>
                    <div class="flex justify-between items-end">
                        <span class="text-tech-muted uppercase font-bold text-[9px] tracking-widest">Total en Bs.</span>
                        <span id="cart-total-bs" class="text-brand-blue text-xl md:text-2xl font-black italic">Bs. 0.00</span>
                    </div>
                </div>
            </div>
            <div class="w-full md:w-7/12 p-6 md:p-10 bg-tech-black flex flex-col overflow-y-auto custom-scroll">
                <div class="flex-grow">
                    <div class="hidden md:flex justify-end mb-4">
                        <button onclick="closeCart()" class="text-tech-muted hover:text-white transition-colors"><i data-lucide="x" class="w-8 h-8"></i></button>
                    </div>
                    <h4 class="text-[9px] font-bold uppercase tracking-widest text-tech-muted mb-4">Selecciona Pago</h4>
                    <div class="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                        <button onclick="setPaymentMethod('Pago Móvil')" id="btn-pago-movil" class="payment-opt border border-white/5 p-3 rounded-xl flex flex-col items-center gap-1 transition-all">
                            <i data-lucide="smartphone" class="w-5 h-5 text-brand-blue"></i>
                            <span class="text-[8px] md:text-[10px] font-bold uppercase text-center">Pago Móvil</span>
                        </button>
                        <button onclick="setPaymentMethod('Efectivo')" id="btn-efectivo" class="payment-opt border border-white/5 p-3 rounded-xl flex flex-col items-center gap-1 transition-all">
                            <i data-lucide="banknote" class="w-5 h-5 text-green-500"></i>
                            <span class="text-[8px] md:text-[10px] font-bold uppercase text-center">Efectivo</span>
                        </button>
                        <button onclick="setPaymentMethod('Binance Pay')" id="btn-binance" class="payment-opt border border-white/5 p-3 rounded-xl flex flex-col items-center gap-1 transition-all">
                            <i data-lucide="coins" class="w-5 h-5 text-yellow-500"></i>
                            <span class="text-[8px] md:text-[10px] font-bold uppercase text-center">Binance</span>
                        </button>
                    </div>
                    <div id="payment-details" class="mb-6 p-5 md:p-8 bg-brand-dark rounded-2xl border border-brand-blue/10 min-h-[140px] hidden flex flex-col justify-center"></div>
                </div>
                <div class="space-y-3">
                    <button id="checkoutBtn" disabled onclick="processCheckout()" class="w-full bg-brand-blue/50 text-white/50 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all">Confirmar Orden</button>
                </div>
            </div>
        </div>
    </div>

    <footer class="py-12 px-6 border-t border-brand-blue/10 mt-16 text-center bg-brand-dark/30">
        <div class="text-lg font-black text-brand-blue mb-4 uppercase tracking-tighter">ALEXPC.</div>
        <p class="text-tech-muted text-[9px] uppercase tracking-[0.3em]">Hardware Premium • Soporte Especializado • Tasa BCV Oficial</p>
    </footer>

    <script>
        const apiKey = ""; 
        const CONTACT_WA = "584142938683"; 
        
        // Datos de Pago Móvil
        const PAGO_MOVIL_INFO = {
            banco: "Banco de Venezuela",
            telefono: "04142938683",
            cedula: "16558005"
        };

        // Tasa base (fallback por si falla la API)
        let tasaBCV = 37.84; 

        lucide.createIcons();

        const products = [
            { id: 1, name: "SSD NVMe Samsung 980 Pro", price: 120.00, desc: "1TB PCIe 4.0 - 7000MB/s", icon: "cpu", color: "from-blue-600/20" },
            { id: 2, name: "RAM Corsair Vengeance", price: 155.50, desc: "32GB DDR5 5200Mhz (2x16GB)", icon: "hard-drive", color: "from-purple-600/20" },
            { id: 3, name: "RTX 4070 Founders Edition", price: 640.00, desc: "12GB GDDR6X - Ray Tracing", icon: "monitor", color: "from-emerald-600/20" },
            { id: 4, name: "Logitech G Pro X Superlight", price: 139.99, desc: "Sensor Hero 25K - White", icon: "mouse", color: "from-cyan-600/20" },
            { id: 5, name: "Fuente EVGA 750W Gold", price: 95.00, desc: "Certificación 80 Plus Gold", icon: "zap", color: "from-yellow-600/20" },
            { id: 6, name: "Case NZXT H5 Flow", price: 110.00, desc: "Compact ATX Mid-Tower", icon: "box", color: "from-orange-600/20" }
        ];

        let cart = [];
        let selectedPayment = null;
        let ticketCounter = 1;
        let lastAiDiagnostic = "";
        let pdfGenerated = false;
        
        let pmData = { banco: '', referencia: '', telefono: '', cedula: '' };

        /**
         * Obtiene la tasa del BCV de forma dinámica.
         * Intenta conectarse a una API pública y si no puede (CORS o error), usa la tasa base.
         */
        async function fetchTasaBCV() {
            const display = document.getElementById('tasa-bcv-display');
            if(display) display.innerHTML = '<span class="animate-pulse">Actualizando...</span>';

            try {
                // Intento de obtener tasa real (API pública de ejemplo para indicadores)
                // Nota: Muchas APIs requieren proxy por CORS, aquí usamos un manejo seguro
                const response = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
                if (!response.ok) throw new Error('API offline');
                
                const data = await response.json();
                if(data && data.promedio) {
                    tasaBCV = parseFloat(data.promedio);
                }
            } catch (e) {
                console.warn("No se pudo obtener tasa en tiempo real, usando tasa de respaldo.");
                // Si falla, se mantiene la tasa estática definida al inicio
            } finally {
                if(display) display.innerText = `Bs. ${tasaBCV.toFixed(2)}`;
                updateCartUI();
                lucide.createIcons();
            }
        }

        async function callGemini(prompt, systemPrompt = "") {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
            const payload = {
                contents: [{ parts: [{ text: prompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            };

            for (let i = 0; i < 5; i++) {
                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    const result = await response.json();
                    return result.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar respuesta.";
                } catch (e) {
                    await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
                }
            }
            return "Error de conexión con el asistente de IA.";
        }

        function getTicketNumber() {
            return ticketCounter.toString().padStart(4, '0');
        }

        async function diagnoseIssue() {
            const msg = document.getElementById('ticketMensaje').value;
            const tipo = document.getElementById('ticketTipo').value;
            const nombre = document.getElementById('ticketNombre').value;

            if (!msg || msg.length < 10) {
                alertCustom("Describe el problema detalladamente.");
                return;
            }

            const box = document.getElementById('aiDiagnosticBox');
            const text = document.getElementById('aiDiagnosticText');
            const btn = document.getElementById('btnDiagnose');
            const numDisp = document.getElementById('ticketNumberDisplay');

            box.classList.remove('hidden');
            text.innerHTML = '<div class="h-3 w-full shimmer rounded mb-2"></div><div class="h-3 w-2/3 shimmer rounded"></div>';
            btn.disabled = true;
            btn.innerText = "Analizando...";

            const prompt = `Cliente: ${nombre}. Falla: ${tipo}. Mensaje: "${msg}". Genera un diagnóstico técnico profesional corto.`;
            const system = "Eres Freddy Collazos de AlexPC. Sé conciso.";

            const diagnostic = await callGemini(prompt, system);
            
            lastAiDiagnostic = diagnostic;
            text.innerHTML = diagnostic.replace(/\n/g, '<br>');
            numDisp.innerText = `#${getTicketNumber()}`;
            
            btn.disabled = false;
            btn.innerHTML = `<i data-lucide="brain-circuit" class="w-4 h-4"></i> Consulta de falla ✨`;
            lucide.createIcons();
        }

        function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const ticketNum = getTicketNumber();
            const nombre = document.getElementById('ticketNombre').value || "Cliente";
            const tipo = document.getElementById('ticketTipo').value;
            const msg = document.getElementById('ticketMensaje').value;

            doc.setFillColor(0, 56, 168);
            doc.rect(0, 0, 210, 35, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.text("ALEXPC | SOPORTE TÉCNICO", 15, 22);
            doc.setFontSize(9);
            doc.text(`N° TICKET: ${ticketNum}`, 165, 22);

            doc.setTextColor(0, 0, 0);
            doc.text("RESUMEN DE SOLICITUD", 15, 50);
            doc.line(15, 52, 195, 52);
            doc.text(`Cliente: ${nombre}`, 15, 62);
            doc.text(`Servicio: ${tipo}`, 15, 68);

            doc.text("PROBLEMA:", 15, 80);
            const splitMsg = doc.splitTextToSize(msg, 180);
            doc.text(splitMsg.slice(0, 5), 15, 86); 

            doc.setFillColor(245, 245, 250);
            doc.rect(15, 110, 180, 80, 'F');
            doc.setTextColor(0, 56, 168);
            doc.text("DIAGNÓSTICO IA", 20, 120);
            doc.setTextColor(40, 40, 40);
            const splitDiag = doc.splitTextToSize(lastAiDiagnostic, 170);
            doc.text(splitDiag, 20, 130);

            doc.save(`Reporte_AlexPC_${ticketNum}.pdf`);
            pdfGenerated = true;
            alertCustom("Reporte descargado.");
        }

        function submitTicket() {
            const nombre = document.getElementById('ticketNombre').value;
            const email = document.getElementById('ticketEmail').value;
            const tipo = document.getElementById('ticketTipo').value;
            const msg = document.getElementById('ticketMensaje').value;
            
            if(!nombre || !msg || !email) { 
                alertCustom("Completa los campos."); 
                return; 
            }

            const ticketNum = getTicketNumber();
            let waMessage = `🛠️ *TICKET DE SOPORTE #${ticketNum}*%0A%0A`;
            waMessage += `👤 *Cliente:* ${nombre}%0A`;
            waMessage += `🔧 *Tipo:* ${tipo}%0A`;
            waMessage += `📝 *Falla:* ${msg}%0A%0A`;

            if (lastAiDiagnostic) {
                waMessage += `✨ *DIAGNÓSTICO:* ${lastAiDiagnostic.substring(0, 300)}...%0A`;
            }

            window.open(`https://wa.me/${CONTACT_WA}?text=${waMessage}`, '_blank');
            ticketCounter++;
            document.getElementById('ticketForm').reset();
        }

        function renderProducts() {
            const grid = document.getElementById('product-grid');
            grid.innerHTML = products.map(p => `
                <div class="product-card p-5 md:p-7 rounded-[25px] flex flex-col group h-full">
                    <div class="relative aspect-[4/3] mb-6 overflow-hidden rounded-2xl bg-tech-black flex items-center justify-center">
                        <div class="absolute inset-0 bg-gradient-to-tr ${p.color} to-transparent opacity-40 group-hover:opacity-60 transition-opacity"></div>
                        <i data-lucide="${p.icon}" class="w-12 h-12 md:w-16 md:h-16 text-white/80 relative z-10 group-hover:scale-110 transition-transform duration-500"></i>
                    </div>
                    <div class="flex-grow">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-[11px] md:text-[13px] uppercase tracking-tight max-w-[75%]">${p.name}</h3>
                            <span class="text-brand-blue font-black text-xs md:text-sm">$${p.price.toFixed(2)}</span>
                        </div>
                        <p class="text-tech-muted text-[9px] md:text-[10px] mb-6 uppercase tracking-widest font-light">${p.desc}</p>
                    </div>
                    <button onclick="addToCart(${p.id})" class="w-full py-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-brand-blue hover:text-white transition-all shadow-lg">
                        Agregar al Carrito
                    </button>
                </div>
            `).join('');
            lucide.createIcons();
        }

        function addToCart(id) {
            const prod = products.find(p => p.id === id);
            cart.push(prod);
            updateCartUI();
            alertCustom(`+1 ${prod.name}`);
        }

        function updateCartUI() {
            document.getElementById('cart-count').innerText = cart.length;
            const itemsContainer = document.getElementById('cart-items');
            const totalUSD = cart.reduce((acc, curr) => acc + curr.price, 0);
            const totalBs = totalUSD * tasaBCV;
            
            if (cart.length === 0) {
                itemsContainer.innerHTML = '<div class="h-full flex flex-col items-center justify-center opacity-20 py-10 text-[9px] font-black uppercase">Carrito Vacío</div>';
                document.getElementById('cart-total').innerText = "$0.00";
                document.getElementById('cart-total-bs').innerText = "Bs. 0.00";
            } else {
                itemsContainer.innerHTML = cart.map((item, index) => `
                    <div class="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                        <div class="flex flex-col">
                            <h4 class="text-[9px] font-bold uppercase truncate max-w-[150px]">${item.name}</h4>
                            <span class="text-brand-blue font-black text-[11px]">$${item.price.toFixed(2)}</span>
                        </div>
                        <button onclick="removeFromCart(${index})" class="text-red-500/50 hover:text-red-500"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                `).join('');
                document.getElementById('cart-total').innerText = `$${totalUSD.toFixed(2)}`;
                document.getElementById('cart-total-bs').innerText = `Bs. ${totalBs.toLocaleString('de-DE', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
            }
            lucide.createIcons();
            validateCheckout();
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
        }

        function openCart() {
            document.getElementById('checkoutModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            fetchTasaBCV();
        }

        function closeCart() {
            document.getElementById('checkoutModal').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        function handlePMChange(field, value) {
            pmData[field] = value;
            validateCheckout();
        }

        function setPaymentMethod(method) {
            selectedPayment = method;
            const detailsDiv = document.getElementById('payment-details');
            detailsDiv.classList.remove('hidden');
            document.querySelectorAll('.payment-opt').forEach(opt => opt.classList.remove('selected'));
            
            if(method === 'Pago Móvil') {
                document.getElementById('btn-pago-movil').classList.add('selected');
                detailsDiv.innerHTML = `
                    <div class="space-y-4">
                        <div class="bg-black/20 p-3 rounded-lg border border-white/5 text-center">
                            <p class="text-brand-blue text-[10px] font-black uppercase tracking-widest mb-1">Datos Destino</p>
                            <p class="text-[9px] text-tech-muted uppercase">Banco: <span class="text-white font-bold">${PAGO_MOVIL_INFO.banco}</span></p>
                            <p class="text-[9px] text-tech-muted uppercase">Cédula: <span class="text-white font-bold">${PAGO_MOVIL_INFO.cedula}</span></p>
                            <p class="text-[9px] text-tech-muted uppercase">Teléfono: <span class="text-white font-bold">${PAGO_MOVIL_INFO.telefono}</span></p>
                        </div>
                        
                        <div class="space-y-2 border-t border-white/5 pt-2">
                            <p class="text-[9px] font-bold uppercase text-brand-blue ml-1">Registrar Datos del Pago:</p>
                            <input type="text" placeholder="Banco Emisor" oninput="handlePMChange('banco', this.value)" value="${pmData.banco}" class="checkout-input">
                            <div class="grid grid-cols-2 gap-2">
                                <input type="text" placeholder="Ref. (Ult 4-6 dígitos)" oninput="handlePMChange('referencia', this.value)" value="${pmData.referencia}" class="checkout-input">
                                <input type="text" placeholder="Cédula Titular" oninput="handlePMChange('cedula', this.value)" value="${pmData.cedula}" class="checkout-input">
                            </div>
                            <input type="tel" placeholder="Teléfono del Pago" oninput="handlePMChange('telefono', this.value)" value="${pmData.telefono}" class="checkout-input">
                        </div>
                    </div>
                `;
            } else if(method === 'Efectivo') {
                document.getElementById('btn-efectivo').classList.add('selected');
                detailsDiv.innerHTML = `<p class="text-center text-[10px] uppercase font-bold text-tech-muted">Acordaremos entrega y pago físico por WhatsApp</p>`;
            } else {
                document.getElementById('btn-binance').classList.add('selected');
                detailsDiv.innerHTML = `<p class="text-center text-[10px] uppercase font-bold text-tech-muted">Solicita el correo de Binance Pay por WhatsApp</p>`;
            }
            
            validateCheckout();
        }

        function validateCheckout() {
            const btn = document.getElementById('checkoutBtn');
            let isValid = cart.length > 0 && selectedPayment !== null;
            
            if (selectedPayment === 'Pago Móvil') {
                isValid = isValid && pmData.banco && pmData.referencia && pmData.cedula && pmData.telefono;
            }

            btn.disabled = !isValid;
            btn.className = isValid ? "w-full bg-brand-blue text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:brightness-110 transition-all" : "w-full bg-brand-blue/30 text-white/30 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest cursor-not-allowed transition-all";
        }

        function processCheckout() {
            const totalUSD = cart.reduce((acc, curr) => acc + curr.price, 0);
            const totalBs = totalUSD * tasaBCV;
            const items = cart.map(p => `• ${p.name}`).join('%0A');
            
            let message = `🛒 *NUEVA ORDEN ALEXPC*%0A%0A`;
            message += `📦 *PRODUCTOS:*%0A${items}%0A%0A`;
            message += `💵 *TOTAL USD:* $${totalUSD.toFixed(2)}%0A`;
            message += `💸 *TOTAL BS:* Bs. ${totalBs.toLocaleString('de-DE', {minimumFractionDigits: 2})}%0A`;
            message += `📈 *TASA BCV:* Bs. ${tasaBCV.toFixed(2)}%0A`;
            message += `💳 *MÉTODO:* ${selectedPayment}%0A%0A`;

            if (selectedPayment === 'Pago Móvil') {
                message += `📝 *DATOS DE PAGO REPORTADOS:*%0A`;
                message += `🏦 Banco: ${pmData.banco}%0A`;
                message += `🔢 Ref: ${pmData.referencia}%0A`;
                message += `🆔 Cédula: ${pmData.cedula}%0A`;
                message += `📱 Telf: ${pmData.telefono}%0A%0A`;
            }

            message += `✅ _Por favor, verifique disponibilidad para proceder._`;
            window.open(`https://wa.me/${CONTACT_WA}?text=${message}`, '_blank');
        }

        function showTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function alertCustom(msg) {
            const div = document.createElement('div');
            div.className = "fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-brand-dark border border-brand-blue p-4 rounded-xl shadow-2xl text-[10px] uppercase font-bold text-center min-w-[200px] animate-bounce";
            div.innerText = msg;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 3000);
        }

        window.onload = () => {
            renderProducts();
            fetchTasaBCV();
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
        };
    </script>
</body>
</html># Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
