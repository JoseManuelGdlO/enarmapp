"use strict";(self.webpackChunkenarmapp=self.webpackChunkenarmapp||[]).push([[89],{4089:(D,w,i)=>{i.r(w),i.d(w,{HomeModule:()=>pe});var C=i(6895),f=i(433),v=i(1086),x=i(5861),p=i(9646),u=i(7579),s=i(9751),l=i(4707),d=i(9841),_=i(4968),e=i(4650),b=i(5577),E=i(4004),S=i(3900),h=i(4999);const y=["*"];var c=(()=>{return(r=c||(c={})).AnnotationChart="AnnotationChart",r.AreaChart="AreaChart",r.Bar="Bar",r.BarChart="BarChart",r.BubbleChart="BubbleChart",r.Calendar="Calendar",r.CandlestickChart="CandlestickChart",r.ColumnChart="ColumnChart",r.ComboChart="ComboChart",r.PieChart="PieChart",r.Gantt="Gantt",r.Gauge="Gauge",r.GeoChart="GeoChart",r.Histogram="Histogram",r.Line="Line",r.LineChart="LineChart",r.Map="Map",r.OrgChart="OrgChart",r.Sankey="Sankey",r.Scatter="Scatter",r.ScatterChart="ScatterChart",r.SteppedAreaChart="SteppedAreaChart",r.Table="Table",r.Timeline="Timeline",r.TreeMap="TreeMap",r.WordTree="wordtree",c;var r})();const U={[c.AnnotationChart]:"annotationchart",[c.AreaChart]:"corechart",[c.Bar]:"bar",[c.BarChart]:"corechart",[c.BubbleChart]:"corechart",[c.Calendar]:"calendar",[c.CandlestickChart]:"corechart",[c.ColumnChart]:"corechart",[c.ComboChart]:"corechart",[c.PieChart]:"corechart",[c.Gantt]:"gantt",[c.Gauge]:"gauge",[c.GeoChart]:"geochart",[c.Histogram]:"corechart",[c.Line]:"line",[c.LineChart]:"corechart",[c.Map]:"map",[c.OrgChart]:"orgchart",[c.Sankey]:"sankey",[c.Scatter]:"scatter",[c.ScatterChart]:"corechart",[c.SteppedAreaChart]:"corechart",[c.Table]:"table",[c.Timeline]:"timeline",[c.TreeMap]:"treemap",[c.WordTree]:"wordtree"},O=new e.OlP("GOOGLE_CHARTS_CONFIG"),L=new e.OlP("GOOGLE_CHARTS_LAZY_CONFIG",{providedIn:"root",factory:()=>{const r=(0,e.f3M)(O,e.XFs.Optional);return(0,p.of)({version:"current",safeMode:!1,...r||{}})}});let z=(()=>{class r{constructor(t,n,a){this.zone=t,this.localeId=n,this.config$=a,this.scriptSource="https://www.gstatic.com/charts/loader.js",this.scriptLoadSubject=new u.x}isGoogleChartsAvailable(){return!(typeof google>"u"||typeof google.charts>"u")}loadChartPackages(...t){return this.loadGoogleCharts().pipe((0,b.z)(()=>this.config$),(0,E.U)(n=>({version:"current",safeMode:!1,...n||{}})),(0,S.w)(n=>new s.y(a=>{google.charts.load(n.version,{packages:t,language:this.localeId,mapsApiKey:n.mapsApiKey,safeMode:n.safeMode}),google.charts.setOnLoadCallback(()=>{this.zone.run(()=>{a.next(),a.complete()})})})))}loadGoogleCharts(){if(this.isGoogleChartsAvailable())return(0,p.of)(void 0);if(!this.isLoadingGoogleCharts()){const t=this.createGoogleChartsScript();t.onload=()=>{this.zone.run(()=>{this.scriptLoadSubject.next(),this.scriptLoadSubject.complete()})},t.onerror=()=>{this.zone.run(()=>{console.error("Failed to load the google charts script!"),this.scriptLoadSubject.error(new Error("Failed to load the google charts script!"))})}}return this.scriptLoadSubject.asObservable()}isLoadingGoogleCharts(){return null!=this.getGoogleChartsScript()}getGoogleChartsScript(){return Array.from(document.getElementsByTagName("script")).find(n=>n.src===this.scriptSource)}createGoogleChartsScript(){const t=document.createElement("script");return t.type="text/javascript",t.src=this.scriptSource,t.async=!0,document.getElementsByTagName("head")[0].appendChild(t),t}}return r.\u0275fac=function(t){return new(t||r)(e.LFG(e.R0b),e.LFG(e.soG),e.LFG(L))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac}),r})(),F=(()=>{class r{create(t,n,a){if(null==t)return;let m=!0;null!=n&&(m=!1);const P=google.visualization.arrayToDataTable(this.getDataAsTable(t,n),m);return a&&this.applyFormatters(P,a),P}getDataAsTable(t,n){return n?[n,...t]:t}applyFormatters(t,n){for(const a of n)a.formatter.format(t,a.colIndex)}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})(),R=(()=>{class r{constructor(t){this.loaderService=t,this.error=new e.vpe,this.ready=new e.vpe,this.stateChange=new e.vpe,this.id=function I(){return"_"+Math.random().toString(36).substr(2,9)}(),this.wrapperReadySubject=new l.t(1)}get wrapperReady$(){return this.wrapperReadySubject.asObservable()}get controlWrapper(){if(!this._controlWrapper)throw new Error("Cannot access the control wrapper before it being initialized.");return this._controlWrapper}ngOnInit(){this.loaderService.loadChartPackages("controls").subscribe(()=>{this.createControlWrapper()})}ngOnChanges(t){!this._controlWrapper||(t.type&&this._controlWrapper.setControlType(this.type),t.options&&this._controlWrapper.setOptions(this.options||{}),t.state&&this._controlWrapper.setState(this.state||{}))}createControlWrapper(){this._controlWrapper=new google.visualization.ControlWrapper({containerId:this.id,controlType:this.type,state:this.state,options:this.options}),this.addEventListeners(),this.wrapperReadySubject.next(this._controlWrapper)}addEventListeners(){google.visualization.events.removeAllListeners(this._controlWrapper),google.visualization.events.addListener(this._controlWrapper,"ready",t=>this.ready.emit(t)),google.visualization.events.addListener(this._controlWrapper,"error",t=>this.error.emit(t)),google.visualization.events.addListener(this._controlWrapper,"statechange",t=>this.stateChange.emit(t))}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(z))},r.\u0275cmp=e.Xpm({type:r,selectors:[["control-wrapper"]],hostAttrs:[1,"control-wrapper"],hostVars:1,hostBindings:function(t,n){2&t&&e.Ikx("id",n.id)},inputs:{for:"for",type:"type",options:"options",state:"state"},outputs:{error:"error",ready:"ready",stateChange:"stateChange"},exportAs:["controlWrapper"],features:[e.TTD],decls:0,vars:0,template:function(t,n){},encapsulation:2,changeDetection:0}),r})(),W=(()=>{class r{constructor(t,n,a){this.element=t,this.loaderService=n,this.dataTableService=a,this.ready=new e.vpe,this.error=new e.vpe,this.initialized=!1}ngOnInit(){this.loaderService.loadChartPackages("controls").subscribe(()=>{this.dataTable=this.dataTableService.create(this.data,this.columns,this.formatters),this.createDashboard(),this.initialized=!0})}ngOnChanges(t){!this.initialized||(t.data||t.columns||t.formatters)&&(this.dataTable=this.dataTableService.create(this.data,this.columns,this.formatters),this.dashboard.draw(this.dataTable))}createDashboard(){const t=this.controlWrappers.map(a=>a.wrapperReady$),n=this.controlWrappers.map(a=>a.for).map(a=>Array.isArray(a)?(0,d.a)(a.map(m=>m.wrapperReady$)):a.wrapperReady$);(0,d.a)([...t,...n]).subscribe(()=>{this.dashboard=new google.visualization.Dashboard(this.element.nativeElement),this.initializeBindings(),this.registerEvents(),this.dashboard.draw(this.dataTable)})}registerEvents(){google.visualization.events.removeAllListeners(this.dashboard);const t=(n,a,m)=>{google.visualization.events.addListener(n,a,m)};t(this.dashboard,"ready",()=>this.ready.emit()),t(this.dashboard,"error",n=>this.error.emit(n))}initializeBindings(){this.controlWrappers.forEach(t=>{if(Array.isArray(t.for)){const n=t.for.map(a=>a.chartWrapper);this.dashboard.bind(t.controlWrapper,n)}else this.dashboard.bind(t.controlWrapper,t.for.chartWrapper)})}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(e.SBq),e.Y36(z),e.Y36(F))},r.\u0275cmp=e.Xpm({type:r,selectors:[["dashboard"]],contentQueries:function(t,n,a){if(1&t&&e.Suo(a,R,4),2&t){let m;e.iGM(m=e.CRH())&&(n.controlWrappers=m)}},hostAttrs:[1,"dashboard"],inputs:{data:"data",columns:"columns",formatters:"formatters"},outputs:{ready:"ready",error:"error"},exportAs:["dashboard"],features:[e.TTD],ngContentSelectors:y,decls:1,vars:0,template:function(t,n){1&t&&(e.F$t(),e.Hsn(0))},encapsulation:2,changeDetection:0}),r})(),j=(()=>{class r{constructor(t,n,a,m){this.element=t,this.scriptLoaderService=n,this.dataTableService=a,this.dashboard=m,this.options={},this.dynamicResize=!1,this.ready=new e.vpe,this.error=new e.vpe,this.select=new e.vpe,this.mouseover=new e.vpe,this.mouseleave=new e.vpe,this.wrapperReadySubject=new l.t(1),this.initialized=!1,this.eventListeners=new Map}get chart(){return this.chartWrapper.getChart()}get wrapperReady$(){return this.wrapperReadySubject.asObservable()}get chartWrapper(){if(!this.wrapper)throw new Error("Trying to access the chart wrapper before it was fully initialized");return this.wrapper}set chartWrapper(t){this.wrapper=t,this.drawChart()}ngOnInit(){this.scriptLoaderService.loadChartPackages(function A(r){return U[r]}(this.type)).subscribe(()=>{this.dataTable=this.dataTableService.create(this.data,this.columns,this.formatters),this.wrapper=new google.visualization.ChartWrapper({container:this.element.nativeElement,chartType:this.type,dataTable:this.dataTable,options:this.mergeOptions()}),this.registerChartEvents(),this.wrapperReadySubject.next(this.wrapper),this.initialized=!0,this.drawChart()})}ngOnChanges(t){if(t.dynamicResize&&this.updateResizeListener(),this.initialized){let n=!1;(t.data||t.columns||t.formatters)&&(this.dataTable=this.dataTableService.create(this.data,this.columns,this.formatters),this.wrapper.setDataTable(this.dataTable),n=!0),t.type&&(this.wrapper.setChartType(this.type),n=!0),(t.options||t.width||t.height||t.title)&&(this.wrapper.setOptions(this.mergeOptions()),n=!0),n&&this.drawChart()}}ngOnDestroy(){this.unsubscribeToResizeIfSubscribed()}addEventListener(t,n){const a=this.registerChartEvent(this.chart,t,n);return this.eventListeners.set(a,{eventName:t,callback:n,handle:a}),a}removeEventListener(t){const n=this.eventListeners.get(t);n&&(google.visualization.events.removeListener(n.handle),this.eventListeners.delete(t))}updateResizeListener(){this.unsubscribeToResizeIfSubscribed(),this.dynamicResize&&(this.resizeSubscription=(0,_.R)(window,"resize",{passive:!0}).pipe((0,h.b)(100)).subscribe(()=>{this.initialized&&this.drawChart()}))}unsubscribeToResizeIfSubscribed(){null!=this.resizeSubscription&&(this.resizeSubscription.unsubscribe(),this.resizeSubscription=void 0)}mergeOptions(){return{title:this.title,width:this.width,height:this.height,...this.options}}registerChartEvents(){google.visualization.events.removeAllListeners(this.wrapper),this.registerChartEvent(this.wrapper,"ready",()=>{google.visualization.events.removeAllListeners(this.chart),this.registerChartEvent(this.chart,"onmouseover",t=>this.mouseover.emit(t)),this.registerChartEvent(this.chart,"onmouseout",t=>this.mouseleave.emit(t)),this.registerChartEvent(this.chart,"select",()=>{const t=this.chart.getSelection();this.select.emit({selection:t})}),this.eventListeners.forEach(t=>t.handle=this.registerChartEvent(this.chart,t.eventName,t.callback)),this.ready.emit({chart:this.chart})}),this.registerChartEvent(this.wrapper,"error",t=>this.error.emit(t))}registerChartEvent(t,n,a){return google.visualization.events.addListener(t,n,a)}drawChart(){null==this.dashboard&&this.wrapper.draw()}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(e.SBq),e.Y36(z),e.Y36(F),e.Y36(W,8))},r.\u0275cmp=e.Xpm({type:r,selectors:[["google-chart"]],hostAttrs:[1,"google-chart"],inputs:{type:"type",data:"data",columns:"columns",title:"title",width:"width",height:"height",options:"options",formatters:"formatters",dynamicResize:"dynamicResize"},outputs:{ready:"ready",error:"error",select:"select",mouseover:"mouseover",mouseleave:"mouseleave"},exportAs:["googleChart"],features:[e.TTD],decls:0,vars:0,template:function(t,n){},styles:["[_nghost-%COMP%]{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;display:block}"],changeDetection:0}),r})(),q=(()=>{class r{static forRoot(t={}){return{ngModule:r,providers:[{provide:O,useValue:t}]}}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({providers:[z]}),r})();var M=i(7757),G=i(6948),B=i(3863);let H=(()=>{class r{constructor(){this.encabezado="",this.cuerpo="",this.datos=[]}ngOnInit(){var t=this;return(0,x.Z)(function*(){console.log("encABRZADO",t.encabezado),console.log("cuerpo",t.cuerpo)})()}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["enarm-toast-phrases"]],inputs:{encabezado:"encabezado",cuerpo:"cuerpo"},decls:5,vars:2,consts:[[1,"div-toast"],[1,"div-header"],[1,"div-body"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"h1",1),e._uU(2),e.qZA(),e.TgZ(3,"h2",2),e._uU(4),e.qZA()()),2&t&&(e.xp6(2),e.Oqu(n.encabezado),e.xp6(2),e.hij('"',n.cuerpo,'"'))},styles:[".div-toast[_ngcontent-%COMP%]{background-color:#000;color:#fff;padding:15px 22px;border-radius:8px}.div-header[_ngcontent-%COMP%]{font-size:18px}.div-body[_ngcontent-%COMP%]{font-size:14px;padding-top:13px;font-weight:500;padding-left:10px}"]}),r})();var N=i(42);const k=function(r){return{"margin-top":"-32px",padding:"7px 0px","background-color":"#D3D3D3",width:r}};let J=(()=>{class r{constructor(){this.percentage="34"}ngOnInit(){return(0,x.Z)(function*(){})()}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["enarm-progress-bar-exam"]],inputs:{percentage:"percentage"},decls:10,vars:5,consts:[[1,"div-container","wrapper"],[1,"one"],[1,"two"],[1,"div-container","wrapper",3,"ngStyle"],[1,"one",2,"color","transparent"],[1,"two",2,"color","transparent"]],template:function(t,n){1&t&&(e.TgZ(0,"div",0)(1,"h5",1),e._uU(2,"Progreso"),e.qZA(),e.TgZ(3,"h5",2),e._uU(4),e.qZA()(),e.TgZ(5,"div",3)(6,"h5",4),e._uU(7,"Progreso"),e.qZA(),e.TgZ(8,"h5",5),e._uU(9),e.qZA()()),2&t&&(e.xp6(4),e.hij("",n.percentage,"%"),e.xp6(1),e.Q6J("ngStyle",e.VKq(3,k,n.percentage+"%")),e.xp6(4),e.hij("",n.percentage,"%"))},dependencies:[C.PC],styles:[".div-container[_ngcontent-%COMP%]{background:#F5F5F5;border-radius:4px;padding:7px 12px}h5[_ngcontent-%COMP%]{font-style:normal;font-weight:600;font-size:13px;line-height:18px;color:#212121}.wrapper[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(2,1fr);grid-gap:10px}.one[_ngcontent-%COMP%]{grid-column:1/2;grid-row:1}.two[_ngcontent-%COMP%]{text-align:right;grid-column:2/2;grid-row:1}"]}),r})();var Q=i(5973),Y=i(9114),$=i(6942),K=i(6290);function X(r,o){if(1&r&&(e.TgZ(0,"h1",24),e._uU(1,"Bienvenido, "),e.TgZ(2,"span",25),e._uU(3),e.qZA()()),2&r){const t=e.oxw();e.xp6(3),e.AsE("",t.user.nombres," ",t.user.apellidos,"")}}function V(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",26)(1,"div",16),e._UZ(2,"google-chart",27,28),e.qZA(),e.TgZ(4,"div",29)(5,"h3",30),e._uU(6,"Examen actual"),e.qZA(),e.TgZ(7,"h4",31),e._uU(8),e.qZA(),e.TgZ(9,"div",32),e._UZ(10,"img",33),e.TgZ(11,"h6",34),e._uU(12),e.qZA()(),e.TgZ(13,"div",35),e._UZ(14,"img",33),e.TgZ(15,"h6",34),e._uU(16),e.qZA()(),e.TgZ(17,"div",32),e._UZ(18,"img",33),e.TgZ(19,"h6",34),e._uU(20),e.qZA()(),e.TgZ(21,"div",36),e._UZ(22,"enarm-progress-bar-exam",37),e.qZA(),e.TgZ(23,"div",38)(24,"enarm-button",39),e.NdJ("onClick",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.router.navigateByUrl("exam/work/"+a.currentExam.id))}),e.qZA()()()()}if(2&r){const t=e.oxw();e.xp6(2),e.Q6J("title",t.title)("type",t.type)("data",t.data)("columnNames",t.columnNames)("options",t.options)("width",t.width)("height",t.height),e.xp6(6),e.hij("Examen ",t.currentExam?t.currentExam.id:"",""),e.xp6(4),e.hij("",t.currentExam?t.currentExam.numeroPreguntas:""," preguntas"),e.xp6(4),e.hij("",t.currentExam?t.currentExam.respondidas:""," preguntas respondidas"),e.xp6(4),e.Oqu(t.currentExam&&t.currentExam.isEspanol?"Espa\xf1ol":"English"),e.xp6(2),e.Q6J("percentage",t.currentExam?(100*t.currentExam.respondidas/t.currentExam.numeroPreguntas).toString():"")}}function ee(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"div",40),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.seeAllExams())}),e.TgZ(1,"h3",41),e._uU(2,"Ver todos"),e.qZA()()}}function te(r,o){1&r&&(e.TgZ(0,"div",42)(1,"div",43)(2,"h5",44),e._uU(3,"EXAMEN"),e.qZA()(),e.TgZ(4,"div",43)(5,"h5",44),e._uU(6,"FECHA"),e.qZA()(),e.TgZ(7,"div",45)(8,"h5",44),e._uU(9,"PROGRESO"),e.qZA()(),e.TgZ(10,"div",46)(11,"h5",44),e._uU(12,"ESTATUS"),e.qZA()()())}function re(r,o){if(1&r&&(e.TgZ(0,"div",6),e._UZ(1,"div",47),e.TgZ(2,"div",43)(3,"h5",48),e._uU(4),e.qZA()(),e.TgZ(5,"div",43)(6,"h5",48),e._uU(7),e.ALo(8,"date"),e.qZA()(),e.TgZ(9,"div",45)(10,"div",49),e._UZ(11,"enarm-mini-progress-bar-exam",50),e.qZA()(),e.TgZ(12,"div",46),e._UZ(13,"enarm-status-exam",51),e.qZA()()),2&r){const t=o.$implicit;e.xp6(4),e.hij("Examen ",t.id,""),e.xp6(3),e.Oqu(e.xi3(8,5,t.creationDate,"dd/MM/yy")),e.xp6(4),e.Q6J("percentage",(100*t.respondidas/t.numeroPreguntas).toString())("subtitle",t.respondidas+"/"+t.numeroPreguntas),e.xp6(2),e.Q6J("type",t.status)}}function ne(r,o){1&r&&(e.TgZ(0,"div",52)(1,"h1",11),e._uU(2,"Aun no tienes ex\xe1menes registrados \u{1f613}!"),e.qZA()())}function ae(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"enarm-modal")(1,"div",53),e._UZ(2,"img",54),e.TgZ(3,"h2"),e._uU(4,"Felicidades"),e.qZA(),e.TgZ(5,"h4"),e._uU(6,"Estas a un solo paso \u{1f525}"),e.qZA(),e.TgZ(7,"h6",55),e._uU(8,"para completar y poder hacer uso de esta gran herramienta es necesario hacer los siguientes pasos para subscribirte en una de nuestras membresias"),e.qZA(),e.TgZ(9,"h6"),e._uU(10,"Es importante platicarte que nuestras membresias tienen los siguientes costos"),e.qZA(),e.TgZ(11,"ul",56)(12,"li"),e._uU(13,"1 mes - 60 pesos"),e.qZA(),e.TgZ(14,"li"),e._uU(15,"2 meses - 120 pesos"),e.qZA(),e.TgZ(16,"li"),e._uU(17,"6 meses - 340 pesos "),e.qZA(),e.TgZ(18,"li"),e._uU(19,"12 meses - 1300 pesos"),e.qZA()()(),e.TgZ(20,"div",57)(21,"h4",58),e._uU(22,"Informaci\xf3n acerca de la CLABE como pago"),e.qZA()(),e.TgZ(23,"div",59)(24,"div",60)(25,"div",61)(26,"h4",62),e._uU(27,"1"),e.qZA()(),e.TgZ(28,"h4",63),e._uU(29,"Accede a tu banca en l\xednea."),e.qZA()(),e.TgZ(30,"div",64),e._UZ(31,"img",65),e.qZA(),e.TgZ(32,"div",60)(33,"div",61)(34,"h4",62),e._uU(35,"2"),e.qZA()(),e.TgZ(36,"h4",63),e._uU(37,"Da de alta la CLABE en esta ficha. "),e.TgZ(38,"h4",66),e._uU(39,"El banco "),e.TgZ(40,"h4",66),e._uU(41,"deber\xe1 de ser STP (Sistema de Transferencia y Pagos). "),e.qZA()()()(),e.TgZ(42,"div",64),e._UZ(43,"img",67),e.qZA(),e.TgZ(44,"div",60)(45,"div",61)(46,"h4",62),e._uU(47,"3"),e.qZA()(),e.TgZ(48,"h4",63),e._uU(49,"Realiza la transferencia correspondiente por la cantidad exacta en esta ficha, "),e.TgZ(50,"h4",66),e._uU(51,"de lo contrario se rechazar\xe1 el cargo. "),e.qZA()()(),e.TgZ(52,"div",64),e._UZ(53,"img",68),e.qZA(),e.TgZ(54,"div",60)(55,"div",61)(56,"h4",62),e._uU(57,"4"),e.qZA()(),e.TgZ(58,"h4",63),e._uU(59,"Al confirmar tu pago, el portal de tu banco generar\xe1 un comprobante digital. "),e.TgZ(60,"h4",66),e._uU(61," En el podr\xe1s verificar que se haya realizado correctamente. "),e.qZA(),e._uU(62," Conserva este comprobante de pago. "),e.qZA()(),e.TgZ(63,"div",64),e._UZ(64,"img",69),e.qZA(),e.TgZ(65,"div",70)(66,"enarm-button",71),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.changeToTail())}),e.qZA()()()()}}function ie(r,o){if(1&r){const t=e.EpF();e.TgZ(0,"enarm-modal")(1,"div",72),e._UZ(2,"img",73),e.TgZ(3,"h1",74),e._uU(4,"Estas en una version prueba\u{1f918}"),e.qZA(),e.TgZ(5,"h6",75),e._uU(6," \xa1Hola! Queremos compartirte una excelente noticia. Te daremos un acceso de prueba a nuestra plataforma: podr\xe1s acceder de manera gratuita a dos ex\xe1menes de 10 preguntas cada uno, con el que podr\xe1s explorar y experimentar las caracter\xedsticas y funcionalidades que ofrecemos. "),e._UZ(7,"br")(8,"br"),e._uU(9," Las opciones para conseguir una suscripci\xf3n est\xe1n en el apartado correspondiente del men\xfa de inicio. "),e._UZ(10,"br")(11,"br"),e._uU(12," Esperamos que la plataforma sea de tu agrado, ya que le estamos metiendo todas las ganas para hacerla lo m\xe1s interactiva y agradable posible, adem\xe1s de que el contenido te sirva para prepararte de la mejor manera! "),e._UZ(13,"br")(14,"br"),e._uU(15," \xa1Gracias por elegirnos! "),e.qZA(),e.TgZ(16,"div",76)(17,"enarm-button",71),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.isTryAccount=!1)}),e.qZA()()()()}}function oe(r,o){1&r&&(e.TgZ(0,"enarm-modal")(1,"div",72),e._UZ(2,"img",77),e.TgZ(3,"h1"),e._uU(4,"Cuenta vencida \u{1f61e}"),e.qZA(),e.TgZ(5,"h6",75),e._uU(6," \xa1Hola! Quer\xeda comunicarte que hemos detectado que tu cuenta en nuestra plataforma se encuentra vencida debido a una falta de pago. Lamentablemente, esto significa que no podr\xe1s acceder a los servicios y beneficios que ofrecemos hasta que se solucione la situaci\xf3n. "),e._UZ(7,"br")(8,"br"),e._uU(9," Para solucionar esta situaci\xf3n, te invitamos a que accedas a tu cuenta y realices el pago correspondiente lo antes posible. Si necesitas ayuda para realizar el pago o tienes alguna duda, nuestro equipo de soporte estar\xe1 disponible para ayudarte. "),e._UZ(10,"br")(11,"br"),e._uU(12," Recuerda que es importante mantener tu cuenta al d\xeda para que puedas seguir disfrutando de los servicios y beneficios que ofrecemos en la plataforma. Si tienes cualquier pregunta o necesitas m\xe1s informaci\xf3n sobre la situaci\xf3n de tu cuenta, no dudes en contactarnos. "),e._UZ(13,"br")(14,"br"),e._uU(15," Esperamos que puedas solucionar pronto esta situaci\xf3n y recuperar el acceso a tu cuenta. \xa1Gracias por tu atenci\xf3n! "),e.qZA()()())}const se=[{path:"",component:(()=>{class r{constructor(t,n,a){this.preferencesService=t,this.homeService=n,this.router=a,this.title="Browser market shares at a specific website, 2014",this.type=c.PieChart,this.data=[["Firefox",45],["IE",26.8],["Chrome",12.8],["Safari",8.5],["Opera",6.2],["Others",.7]],this.columnNames=["Browser","Percentage"],this.options={},this.width=280,this.height=280,this.examDate=0,this.exams=[{id:1,progress:79,questions:162,answers:123,status:1,creationDate:"",respondidas:1,numeroPreguntas:1,isEspanol:1},{id:2,progress:65,questions:162,answers:100,status:2,creationDate:"",respondidas:1,numeroPreguntas:1,isEspanol:1},{id:3,progress:38,questions:162,answers:67,status:2,creationDate:"",respondidas:1,numeroPreguntas:1,isEspanol:1},{id:4,progress:15,questions:162,answers:32,status:3,creationDate:"",respondidas:1,numeroPreguntas:1,isEspanol:1}],this.phrase={autor:"",frase:"",id:0},this.isNew=!1,this.isTryAccount=!1,this.isExpireAccount=!1}ngOnInit(){this.getData(),this.getExams(),this.getExamDate(),this.getPhrase()}getPhrase(){var t=this;return(0,x.Z)(function*(){try{const n=yield t.homeService.getPhrase();t.phrase=n[Math.floor(Math.random()*n.length)]}catch(n){console.error(n)}})()}getExamDate(){var t=this;return(0,x.Z)(function*(){try{const n=yield t.homeService.getConfigs("EXAM_DATE"),P=(new Date(n).getTime()-(new Date).getTime())/864e5;t.examDate=Math.round(P)}catch(n){console.error(n)}})()}getData(){switch(this.responsedata=this.preferencesService.getItem("USER"),this.user=this.responsedata.data,this.responsedata.account.estatus){case M.Q.NEW:this.isNew=!0;break;case M.Q.TRY:this.isTryAccount=!0;break;case M.Q.EXPIRE:this.isExpireAccount=!0}}getExams(){var t=this;return(0,x.Z)(function*(){try{t.exams=yield t.homeService.getExams(t.responsedata.account.idUsuario),t.exams.sort((n,a)=>new Date(a.creationDate).valueOf()-new Date(n.creationDate).valueOf()),t.exams.forEach(n=>{n.status=n.respondidas===n.numeroPreguntas?1:2}),t.currentExam=t.exams[0],t.exams.splice(0,1)}catch(n){console.error(n)}})()}changeToTail(){var t=this;return(0,x.Z)(function*(){t.isNew=!1,t.isTryAccount=!0;try{yield t.homeService.changeAccontStatus(t.responsedata.account.idUsuario,M.Q.TRY),t.responsedata.account.estatus=M.Q.TRY,t.preferencesService.setItem("USER",t.responsedata)}catch(n){console.error(n)}})()}onSelect(t){console.log("Item clicked",JSON.parse(JSON.stringify(t)))}onActivate(t){console.log("Activate",JSON.parse(JSON.stringify(t)))}onDeactivate(t){console.log("Deactivate",JSON.parse(JSON.stringify(t)))}seeAllExams(){this.router.navigateByUrl("exam/exams")}}return r.\u0275fac=function(t){return new(t||r)(e.Y36(G.y),e.Y36(B.Y),e.Y36(v.F0))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],decls:31,vars:13,consts:[[3,"profile"],[1,"ph-55",2,"padding-top","9%"],[1,"div___name"],["class","h1___welcome",4,"ngIf"],[1,"h1___daystoenarm"],["src","assets/icons/calendar-icon.svg","alt",""],[1,"row"],[1,"col-50","mt-38"],["style","display: flex;","class","pr-25",4,"ngIf"],[1,"mtt-50","div___moreExams"],[1,"div___headerExams","mtt-20"],[1,"h1___exams"],["class","buttonSeeAll",3,"click",4,"ngIf"],["class","row mtt-30",4,"ngIf"],["class","row",4,"ngFor","ngForOf"],["class","div___noexamlist",4,"ngIf"],[1,"col-50"],[1,"mt-38","pl-25"],[3,"encabezado","cuerpo"],[1,"div___add","mt-38"],[1,"button___add",3,"click"],[2,"font-size","50px"],[1,"h1___add",2,"margin-left","15px"],[4,"ngIf"],[1,"h1___welcome"],[2,"font-weight","600","color","black"],[1,"pr-25",2,"display","flex"],[3,"title","type","data","columnNames","options","width","height"],["chart",""],[1,"col-50","div__exam"],[1,"h3___titleexam"],[1,"h4___titleexam","mt-14"],[1,"mt-8",2,"display","flex"],["src","assets/icons/check-icon.svg","alt",""],[1,"h6___litext","pl-5"],[1,"mt-12",2,"display","flex"],[1,"mt-18"],[3,"percentage"],[1,"mtt-30"],["text","Retomar examen",3,"onClick"],[1,"buttonSeeAll",3,"click"],[1,"h3___seeAll"],[1,"row","mtt-30"],[1,"col-25"],[1,"h5___titleTable"],[1,"col-30"],[1,"col-20"],[1,"div___line"],[1,"h5___titleTableBody"],[2,"padding-right","40px"],[3,"percentage","subtitle"],[3,"type"],[1,"div___noexamlist"],[2,"text-align","center"],["src","assets/images/happines.jpg","alt","",2,"width","50%"],[1,"mt-3"],[1,"costos"],[1,"buttonLeftContainer","mtt-20"],["numberOfLines","{2}",1,"buttonText"],[1,"cardContainer"],[1,"rowAlign"],[1,"circle"],[1,"number"],[1,"instructionsDescription"],[2,"align-self","center"],["src","assets/images/exampleWeb.png","width","{50}"],[1,"instructionsTitle"],["src","assets/images/exampleScreenBank.png","width","{30}"],["src","assets/images/exampleTransferBank.png","width","{30}"],["src","assets/images/exampleVaoucherBank.png","width","{30}"],[2,"width","100%","text-align","center","padding","5% 20%"],["text","Entendido",3,"click"],[2,"padding","0 5%"],["src","assets/images/trial-version@4x.png","alt","",1,"mtt-20",2,"width","50%"],[2,"margin-top","-40px"],[1,"mtt-20"],[2,"width","100%","text-align","center","padding","5% 0"],["src","assets/images/expire-account@2x.png","alt","",1,"mtt-20",2,"width","50%"]],template:function(t,n){1&t&&(e.TgZ(0,"body"),e._UZ(1,"enarm-header",0),e.TgZ(2,"div",1)(3,"div",2),e.YNc(4,X,4,2,"h1",3),e.TgZ(5,"h1",4),e._UZ(6,"img",5),e._uU(7),e.qZA()(),e.TgZ(8,"div",6)(9,"div",7),e.YNc(10,V,25,12,"div",8),e.TgZ(11,"div",9)(12,"div",10)(13,"h1",11),e._uU(14,"Ex\xe1menes previos"),e.qZA(),e.YNc(15,ee,3,0,"div",12),e.qZA(),e.YNc(16,te,13,0,"div",13),e.YNc(17,re,14,8,"div",14),e.YNc(18,ne,3,0,"div",15),e.qZA()(),e.TgZ(19,"div",16)(20,"div",17),e._UZ(21,"enarm-toast-phrases",18),e.TgZ(22,"div",19)(23,"div",20),e.NdJ("click",function(){return n.router.navigateByUrl("configurator")}),e.TgZ(24,"h1",21),e._uU(25,"+"),e.qZA(),e.TgZ(26,"h1",22),e._uU(27," Armar nuevo examen"),e.qZA()()()()()()(),e.YNc(28,ae,67,0,"enarm-modal",23),e.YNc(29,ie,18,0,"enarm-modal",23),e.YNc(30,oe,16,0,"enarm-modal",23),e.qZA()),2&t&&(e.xp6(1),e.Q6J("profile",n.user.nombres),e.xp6(3),e.Q6J("ngIf",n.user),e.xp6(3),e.hij(" Quedan ",n.examDate," d\xedas para el ENARM 2023, \xa1tu puedes! "),e.xp6(3),e.Q6J("ngIf",n.currentExam),e.xp6(5),e.Q6J("ngIf",0!==n.exams.length),e.xp6(1),e.Q6J("ngIf",0!==n.exams.length),e.xp6(1),e.Q6J("ngForOf",n.exams.slice(0,3)),e.xp6(1),e.Q6J("ngIf",0===n.exams.length),e.xp6(3),e.Q6J("encabezado",n.phrase.autor)("cuerpo",n.phrase.frase),e.xp6(7),e.Q6J("ngIf",n.isNew),e.xp6(1),e.Q6J("ngIf",n.isTryAccount),e.xp6(1),e.Q6J("ngIf",n.isExpireAccount))},dependencies:[C.sg,C.O5,j,H,N.r,J,Q.X,Y.O,$.h,K.G,C.uU],styles:['body[_ngcontent-%COMP%]{background-color:#fbfbfb}.h1___welcome[_ngcontent-%COMP%]{font-style:normal;font-weight:400;font-size:32px;line-height:44px;color:#818181}.h1___daystoenarm[_ngcontent-%COMP%]{font-style:normal;font-weight:400;font-size:24px;line-height:33px;color:#818181}.div___name[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.button___add[_ngcontent-%COMP%]{height:100%;background:#FFFFFF;border:1px solid #F1F1F1;border-radius:13px;display:flex;align-items:center;justify-content:center;cursor:pointer}.div___add[_ngcontent-%COMP%]{position:absolute;padding:18px;height:60%;width:46%;border:2px dashed #C8C8C8;border-radius:11px;margin-bottom:20px}.h1___add[_ngcontent-%COMP%]{font-style:normal;font-weight:600;font-size:24px;line-height:33px;color:#212121}.div__exam[_ngcontent-%COMP%]{background:#FFFFFF;border:1px solid #F1F1F1;border-radius:13px;padding:20px}.h3___titleexam[_ngcontent-%COMP%]{font-style:normal;font-weight:700;font-size:20px;line-height:27px;color:#212121}.h4___titleexam[_ngcontent-%COMP%]{font-style:normal;font-weight:500;font-size:16px;line-height:22px;color:#212121}.h6___litext[_ngcontent-%COMP%]{font-family:Inter;font-style:normal;font-weight:500;font-size:14px;line-height:18px;letter-spacing:.005em;color:#212121}ul[_ngcontent-%COMP%]{list-style-type:none}.buttonSeeAll[_ngcontent-%COMP%]{cursor:pointer;background:#000000;border-radius:4px;padding:5px}.h1___exams[_ngcontent-%COMP%]{font-weight:700;font-size:20px;line-height:27px;color:#212121}.h3___seeAll[_ngcontent-%COMP%]{font-style:normal;font-weight:700;font-size:12px;line-height:16px;color:#fff}.div___headerExams[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.div___moreExams[_ngcontent-%COMP%]{background:#FFFFFF;border:1px solid #F1F1F1;border-radius:13px;margin-right:25px;padding-left:26px;padding-right:26px;padding-bottom:20px;margin-bottom:50px}.h5___titleTable[_ngcontent-%COMP%]{font-style:normal;font-weight:700;font-size:9.49651px;line-height:13px;text-transform:uppercase;color:#a3a3a3}.div___line[_ngcontent-%COMP%]{width:100%;height:1px;background-color:#e8e8e8;margin-bottom:18px;margin-top:18px}.h5___titleTableBody[_ngcontent-%COMP%]{font-style:normal;font-weight:600;font-size:13px;line-height:18px;color:#000}.informationContainer[_ngcontent-%COMP%]{width:"100%";border-radius:8px;flex-direction:row;justify-content:space-between;align-items:center;padding:12px 16px}.costos[_ngcontent-%COMP%]{padding:0 15%;text-align:left}.buttonLeftContainer[_ngcontent-%COMP%]{flex-direction:"row"}.buttonText[_ngcontent-%COMP%]{font-weight:700;font-size:2vw;color:#000;margin-left:10px}.rowAlign[_ngcontent-%COMP%]{flex-direction:row;margin-left:13px;margin-right:13;padding-bottom:20px;padding-top:20px;margin-right:15px}.instructionsDescription[_ngcontent-%COMP%]{font-size:14px;margin-left:5px;margin-right:5px}.instructionsTitle[_ngcontent-%COMP%]{font-size:14px;font-weight:"bold";margin-left:5px;margin-right:5px}.instructions[_ngcontent-%COMP%]{color:#000;font-size:16px;margin-top:5px}.numberReference[_ngcontent-%COMP%]{justify-content:center;font-size:14px;font-weight:"bold"}.containerInformation[_ngcontent-%COMP%]{background-color:gray;width:"100%";height:300;border-radius:8;justify-content:center;align-items:center;top:15}.circle[_ngcontent-%COMP%]{width:22;height:22;border-radius:22px/2;justify-content:center;margin-top:5px;align-items:center}.number[_ngcontent-%COMP%]{text-align:center;font-size:2vw;color:#fff;font-weight:700}.icons[_ngcontent-%COMP%]{align-self:center;margin-left:15px;margin-top:15px;margin-bottom:15px}.div___noexamlist[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:16% 0;border-radius:8px;background-color:#f8f9fa}']}),r})()}];let ce=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[v.Bz.forChild(se),v.Bz]}),r})();var le=i(529),de=i(4466);let pe=(()=>{class r{}return r.\u0275fac=function(t){return new(t||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({imports:[C.ez,ce,f.u5,f.UX,q,le.JF,de.m]}),r})()},4968:(D,w,i)=>{i.d(w,{R:()=>_});var C=i(8421),f=i(9751),v=i(5577),x=i(1144),p=i(576),u=i(3268);const s=["addListener","removeListener"],l=["addEventListener","removeEventListener"],d=["on","off"];function _(h,y,g,T){if((0,p.m)(g)&&(T=g,g=void 0),T)return _(h,y,g).pipe((0,u.Z)(T));const[c,U]=function S(h){return(0,p.m)(h.addEventListener)&&(0,p.m)(h.removeEventListener)}(h)?l.map(A=>Z=>h[A](y,Z,g)):function b(h){return(0,p.m)(h.addListener)&&(0,p.m)(h.removeListener)}(h)?s.map(e(h,y)):function E(h){return(0,p.m)(h.on)&&(0,p.m)(h.off)}(h)?d.map(e(h,y)):[];if(!c&&(0,x.z)(h))return(0,v.z)(A=>_(A,y,g))((0,C.Xf)(h));if(!c)throw new TypeError("Invalid event target");return new f.y(A=>{const Z=(...O)=>A.next(1<O.length?O:O[0]);return c(Z),()=>U(Z)})}function e(h,y){return g=>T=>h[g](y,T)}},4999:(D,w,i)=>{i.d(w,{b:()=>s});var C=i(4408);const v=new(i(7565).v)(C.o);var p=i(4482),u=i(5403);function s(l,d=v){return(0,p.e)((_,e)=>{let b=null,E=null,S=null;const h=()=>{if(b){b.unsubscribe(),b=null;const g=E;E=null,e.next(g)}};function y(){const g=S+l,T=d.now();if(T<g)return b=this.schedule(void 0,g-T),void e.add(b);h()}_.subscribe((0,u.x)(e,g=>{E=g,S=d.now(),b||(b=d.schedule(y,l),e.add(b))},()=>{h(),e.complete()},void 0,()=>{E=b=null}))})}},4408:(D,w,i)=>{i.d(w,{o:()=>p});var C=i(727);class f extends C.w0{constructor(s,l){super()}schedule(s,l=0){return this}}const v={setInterval(u,s,...l){const{delegate:d}=v;return d?.setInterval?d.setInterval(u,s,...l):setInterval(u,s,...l)},clearInterval(u){const{delegate:s}=v;return(s?.clearInterval||clearInterval)(u)},delegate:void 0};var x=i(8737);class p extends f{constructor(s,l){super(s,l),this.scheduler=s,this.work=l,this.pending=!1}schedule(s,l=0){var d;if(this.closed)return this;this.state=s;const _=this.id,e=this.scheduler;return null!=_&&(this.id=this.recycleAsyncId(e,_,l)),this.pending=!0,this.delay=l,this.id=null!==(d=this.id)&&void 0!==d?d:this.requestAsyncId(e,this.id,l),this}requestAsyncId(s,l,d=0){return v.setInterval(s.flush.bind(s,this),d)}recycleAsyncId(s,l,d=0){if(null!=d&&this.delay===d&&!1===this.pending)return l;null!=l&&v.clearInterval(l)}execute(s,l){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const d=this._execute(s,l);if(d)return d;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(s,l){let _,d=!1;try{this.work(s)}catch(e){d=!0,_=e||new Error("Scheduled action threw falsy error")}if(d)return this.unsubscribe(),_}unsubscribe(){if(!this.closed){const{id:s,scheduler:l}=this,{actions:d}=l;this.work=this.state=this.scheduler=null,this.pending=!1,(0,x.P)(d,this),null!=s&&(this.id=this.recycleAsyncId(l,s,null)),this.delay=null,super.unsubscribe()}}}},7565:(D,w,i)=>{i.d(w,{v:()=>v});var C=i(6063);class f{constructor(p,u=f.now){this.schedulerActionCtor=p,this.now=u}schedule(p,u=0,s){return new this.schedulerActionCtor(this,p).schedule(s,u)}}f.now=C.l.now;class v extends f{constructor(p,u=f.now){super(p,u),this.actions=[],this._active=!1}flush(p){const{actions:u}=this;if(this._active)return void u.push(p);let s;this._active=!0;do{if(s=p.execute(p.state,p.delay))break}while(p=u.shift());if(this._active=!1,s){for(;p=u.shift();)p.unsubscribe();throw s}}}}}]);