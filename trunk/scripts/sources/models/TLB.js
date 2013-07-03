function EntradaTLB(params){
    this.processo_id = (params.processo_id || "");
    this.n_pagina = (params.n_pagina || null);
    this.entrada_tp  = new EntradaTP();
}

function TLB(n_entradas){
    var self = this;
    self.n_entradas = n_entradas;
    self.entradas = [];
    self.inicializar = function(){
        for(var i= 0; i < self.n_entradas; i++)
            self.entradas.push(new EntradaTLB({}));
        console.log(n_entradas);
    };
    var proxEntrada = -1;
    self.carregarEntrada = function(n_pagina, pagina){
        proxEntrada = (proxEntrada + 1) % n_entradas;
        var entrada_tlb = self.getEntradaTLB(proxEntrada);
        if (entrada_tlb.entrada_tp.p)
            alert("SWAP OUT - GRAVAR EM MS");
        self.entradas[proxEntrada] = new EntradaTLB(n_pagina,pagina);
    }
    
    self.getEntradaTLB = function(i){
        return self.entradas[i];
    }
    self.setEntradaTLB = function(i, entrada){
        self.entradas[i] = entrada;
    }
    
    self.buscarPaginaProcesso = function(processo_id, n_pagina){
        var pagina = null;
        $.each(self.entradas, function(i,entrada){
            if(entrada.n_pagina == n_pagina)
                pagina = entrada.pagina;
        });
        return pagina;
    }
    self.inicializar();
}