require.config({
    urlArgs: "bust=" + (new Date()).getTime()
});

require(["sources/MemoriaVirtualViewModel","sources/models/Pedido","sources/models/MemoriaVirtual","sources/models/TLB", "sources/models/TP", "sources/models/MP",  "sources/models/MS",  "sources/models/Processo"  ], function () {

    $(document).ready(function(){
        viewmodel = new MemoriaVirtualViewModel();
        ko.applyBindings(viewmodel);
        log = console.log;
    });
});
