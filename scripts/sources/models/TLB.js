function EntradaTLB(params){
    this.processo_id = ko.observable((params.processo_id || ""));
    this.n_pagina =  ko.observable((params.n_pagina || null));
    this.entrada_tp  =  ko.observable(params.entrada_tp || new EntradaTP());
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
        self.entradas[proxEntrada] = new EntradaTLB({
            processo_id: processo_id,
            n_pagina: n_pagina,
            entrada_tp: entrada_tp});
    }

    self.buscarPaginaVirtual = function(processo_id, n_pagina){
        var pagina = null;
        $.each(self.entradas, function(i,entrada){
            if(entrada.n_pagina() == n_pagina)
                pagina = entrada.pagina;
        });
        return pagina;
    }
    self.inicializar();
}