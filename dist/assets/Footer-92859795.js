import{_,z as b,o as u,c as g,a as t,e as n,h as i,i as l,n as k,p,b as m,A as x,t as w}from"./index-128ba08c.js";const $="/img/logo.png";const y={data(){return{sidebarToggled:!1}}},o=a=>(p("data-v-f639b77c"),a=a(),m(),a),S=o(()=>t("a",{class:"sidebar-brand d-flex align-items-center justify-content-center",href:"#"},[t("div",{class:"sidebar-brand-icon mt-2"},[t("img",{src:$,alt:"logo",width:"140"})])],-1)),B=o(()=>t("div",{class:"sidebar-heading mt-5 text-success"},"Menu",-1)),T={class:"nav-item"},P=o(()=>t("i",{class:"bi bi-grid text-dark"},null,-1)),C=o(()=>t("span",null,"Dashboard",-1)),I={class:"nav-item"},N=o(()=>t("i",{class:"bi bi-currency-exchange text-dark"},null,-1)),A=o(()=>t("span",null,"Program Sosial",-1)),L={class:"nav-item"},M=o(()=>t("i",{class:"bi bi-credit-card text-dark"},null,-1)),D=o(()=>t("span",null,"Transaksi",-1)),z={class:"nav-item"},F=o(()=>t("a",{class:"nav-link collapsed text-primary",href:"#","data-toggle":"collapse","data-target":"#collapsePagesProduct","aria-expanded":"true","aria-controls":"collapsePagesProduct"},[t("i",{class:"bi bi-bag-fill text-dark"}),t("span",null,"Product")],-1)),V={id:"collapsePagesProduct",class:"collapse","aria-labelledby":"headingPages","data-parent":"#accordionSidebar"},j={class:"bg-white py-2 collapse-inner rounded"},E=o(()=>t("h6",{class:"collapse-header"},"Menu Product",-1)),q=o(()=>t("hr",{class:"sidebar-divider d-none d-md-block"},null,-1));function G(a,e,f,v,c,r){const s=b("router-link");return u(),g("ul",{class:k(["navbar-nav bg-light sidebar sidebar-dark accordion",{toggled:c.sidebarToggled}]),id:"accordionSidebar"},[S,B,t("li",T,[n(s,{class:"nav-link text-dark",to:"/","active-class":"active-link"},{default:i(()=>[P,C]),_:1})]),t("li",I,[n(s,{class:"nav-link text-dark",to:"/sosial","active-class":"active-link"},{default:i(()=>[N,A]),_:1})]),t("li",L,[n(s,{class:"nav-link text-dark",to:"/transaksi","active-class":"active-link"},{default:i(()=>[M,D]),_:1})]),t("li",z,[F,t("div",V,[t("div",j,[E,n(s,{class:"dropdown-item",to:{name:"product"}},{default:i(()=>[l("List Product")]),_:1}),n(s,{class:"dropdown-item",to:{name:"my-product"}},{default:i(()=>[l("My Product")]),_:1})])])]),q],2)}const ct=_(y,[["render",G],["__scopeId","data-v-f639b77c"]]);const H={props:{sidebarToggled:Boolean},data(){return{name:"",gambar:"",user_id:""}},methods:{sidebarToggled(){this.$emit("toggle-sidebar",!this.sidebarToggled)},konfirmasi(){Swal.fire({title:"Apakah Anda yakin ingin logout?",text:"Anda akan keluar dari akun ini.",icon:"warning",showCancelButton:!0,confirmButtonColor:"#d33",cancelButtonColor:"#3085d6",confirmButtonText:"Logout",cancelButtonText:"Batal"}).then(a=>{a.isConfirmed})},logout(){const a=sessionStorage.getItem("token");if(!a){Swal.fire({title:"Logout gagal",text:"Token tidak ditemukan.",icon:"error",confirmButtonColor:"#d33"});return}axios.post("https://backend-sblf.lumirainternational.com/api/auth/logout",null,{headers:{Authorization:"Bearer "+a}}).then(e=>{Swal.fire({title:"Logout berhasil!",icon:"success",timer:1500,timerProgressBar:!0,showConfirmButton:!1}),sessionStorage.removeItem("token"),this.$router.push("/")}).catch(e=>{console.error(e),Swal.fire({title:"Logout gagal",text:"Terjadi kesalahan saat melakukan logout.",icon:"error",confirmButtonColor:"#d33"})})}},created(){}},d=a=>(p("data-v-4d870316"),a=a(),m(),a),J={class:"navbar navbar-expand navbar-light customNav bg-success topbar mb-4 static-top shadow"},K=d(()=>t("i",{class:"fa fa-bars"},null,-1)),O=[K],Q={class:"navbar-nav ml-auto"},R=d(()=>t("div",{class:"topbar-divider d-none d-sm-block"},null,-1)),U={class:"nav-item dropdown no-arrow"},W={class:"nav-link dropdown-toggle",href:"#",id:"userDropdown",role:"button","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},X={class:"mr-2 d-none d-lg-inline text-white small"},Y=["src"],Z={class:"dropdown-menu dropdown-menu-right shadow animated--grow-in","aria-labelledby":"userDropdown"},tt=d(()=>t("i",{class:"fas fa-solid fa-user fa-sm fa-fw mr-2 text-gray-400"},null,-1)),at=d(()=>t("i",{class:"fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"},null,-1));function et(a,e,f,v,c,r){const s=b("router-link");return u(),g("nav",J,[t("form",{class:"form-inline",onSubmit:e[1]||(e[1]=x(()=>{},["prevent"]))},[t("button",{id:"sidebarToggleTop",class:"btn btn-link d-md-none rounded-circle mr-3 text-light",onClick:e[0]||(e[0]=(...h)=>r.sidebarToggled&&r.sidebarToggled(...h))},O)],32),t("ul",Q,[R,t("li",U,[t("a",W,[t("span",X,w(this.name),1),t("img",{src:"https://backend-sblf.lumirainternational.com/storage/profile/"+c.gambar,alt:" gambarprofile",class:"img-profile rounded-circle"},null,8,Y)]),t("div",Z,[n(s,{class:"dropdown-item",to:"/admin-profile","data-toggle":"modal","data-target":"#logoutModal"},{default:i(()=>[tt,l(" Profil ")]),_:1}),t("a",{class:"dropdown-item",href:"#","data-toggle":"modal","data-target":"#logoutModal",onClick:e[2]||(e[2]=h=>r.konfirmasi())},[at,l(" Logout ")])])])])])}const _t=_(H,[["render",et],["__scopeId","data-v-4d870316"]]);const ot={},st=a=>(p("data-v-c1914924"),a=a(),m(),a),nt={class:"sticky-footer customNav bg-success"},it=st(()=>t("div",{class:"container my-auto"},[t("div",{class:"copyright text-center my-auto"},[t("strong",null,"Copyright © BABA 2024")])],-1)),rt=[it];function lt(a,e){return u(),g("footer",nt,rt)}const ut=_(ot,[["render",lt],["__scopeId","data-v-c1914924"]]);export{ut as F,_t as N,ct as S};
