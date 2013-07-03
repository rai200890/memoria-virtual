function MemoriaVirtual(params){
    var self = this;
    var n_quadros = Math.ceil(params.tam_mp/params.tam_quadro);
    
    self.tlb = new TLB(5);
    self.mp = new MP(n_quadros);
    self.ms = new MS(params.tam_ms);
    self.tps = ko.observableArray([]);
    
    
    self.carregarProcesso = function(processo){
        self.ms.carregarPaginas(processo);
        var n_paginas = Math.ceil(processo.tamanho/params.tam_quadro);
        self.tps.push(new TP(processo.id, n_paginas));
    }
    
    self.processarPedido = function(processo_id, end_virtual, escrita){
        var tp = self.getTP(processo_id);
        if(tp){
            if (escrita)
                self.escrever(tp, end_virtual);
            else
                self.buscar(tp,end_virtual);
        }else
            alert("Processo não existe!")
    }
}
self.escrever = function(tp, end_virtual){
    if(escrita){
        tp.modificaEntrada(n_pagina);
    }
}

self.buscar = function(tp, end_virtual){
    var n_pagina = Math.floor(end_virtual/params.tam_quadro);
    var entrada_tp = self.tlb.getEntradaTP(processo_id, n_pagina);
    if (!entrada_tp){
        alert("TLB Miss!");
        //verificar se a página é válida
        entrada_tp = tp.entradas[n_pagina];
        self.tlb.carregar(processo_id, n_pagina, entrada_tp);
    }
    if (entrada_tp.p) {
       
    }else
        alert("Falta de Página");
    var indexQuadroLivre = self.mp.getQuadroLivre();
    if (indexQuadroLivre != null){
        var entrada = tp.entradas[n_pagina];
        entrada.n_quadro = indexQuadroLivre;
        entrada.p = true;
        tp.entradas[n_pagina] = entrada;
        self.tps[indexTP] = tp;
        var quadro = self.mp.quadros[indexQuadroLivre];
        quadro.u = true;
        self.mp.quadros[indexQuadroLivre] = quadro;
    }else
        alert("Processo Não Existe");
}
