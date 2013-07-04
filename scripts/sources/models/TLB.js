function EntradaTLB(params){
    this.processo_id = ko.observable((params.processo_id || ""));
    this.n_pagina =  ko.observable((params.n_pagina || null));
    this.entrada_tp = ko.observable(params.entrada_tp || new EntradaTP());
}

function TLB(n_entradas){
    var self = this;
    var proxEntrada = -1;

    self.n_entradas = n_entradas;
    self.entradas = [];
    self.inicializar = function(){
        for(var i= 0; i < self.n_entradas; i++)
            self.entradas.push(new EntradaTLB({}));
    };

    self.carregaEntrada = function(processo_id,n_pagina,entrada_tp){
        proxEntrada = (proxEntrada + 1) % self.n_entradas;
        var entrada_tlb = self.entradas[proxEntrada];
        entrada_tlb.processo_id(processo_id);
        entrada_tlb.n_pagina(n_pagina);
        entrada_tlb.entrada_tp(entrada_tp);
    }

    self.inicializar();
}