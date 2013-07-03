function EntradaTLB(params){
    this.processo_id = ko.observable(params.processo_id||null);
    this.n_pagina = ko.observable(params.n_pagina || null);
    this.entrada_tp = ko.observable(new EntradaTP());
}

function TLB(n_entradas){
    var self = this;
    self.entradas = [];
    //próxima entrada a ser substituida na tlb
    var proxEntrada = -1;

    self.incrementarProxEntrada = function(){
        proxEntrada = (proxEntrada + 1) % n_entradas;
        return proxEntrada
    }
    
    self.inicializar = function(){
        for(var i= 0; i < n_entradas; i++)
            self.entradas.push(new EntradaTLB({}));
    };
    
    self.buscarEntradaTP = function(processo_id, n_pagina){
        var resposta = null;
        $.each(self.entradas(), function(index, entrada){
            if(entrada.processo_id() == processo_id && entrada.n_pagina() == n_pagina)
                resposta = entrada.entrada_tp;
        });
        return resposta;
    }

    self.carregarEntradaTP = function(processo_id,n_pagina, entrada_tp){
        var prox = self.incrementarProxEntrada();
        var entrada_tlb = self.entradas()[prox];
        
        entrada_tlb.processo_id(processo_id);
        entrada_tlb.n_pagina(n_pagina);
        entrada_tlb.entrada_tp(entrada_tp);
    }
    self.inicializar();
}