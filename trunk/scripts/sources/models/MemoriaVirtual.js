function MemoriaVirtual(params){
    var self = this;
    self.politica = params.politica;
    self.escopo_substituicao = params.politica_substituicao;
    self.tam_tlb = parseInt(params.tam_tlb);
    self.tam_mp = parseInt(params.tam_mp);
    self.tam_ms = parseInt(params.tam_ms);
    self.tam_quadro = parseInt(params.tam_quadro);
    self.tam_endereco = parseInt(params.tam_endereco);

    self.n_quadros = Math.ceil(self.tam_mp/self.tam_quadro);

    self.tlb = ko.observable(new TLB(self.tam_tlb));
    self.mp = ko.observable(new MP(self.n_quadros, self.politica));
    self.ms = ko.observable(new MS(self.tam_ms));
    self.tps = ko.observableArray([]);

    self.carregarProcesso = function(processo){
        var n_paginas = Math.ceil(processo.tamanho/self.tam_quadro);
        if(processo.tamanho > self.tam_mp){
            alert('Processo tem mais páginas que a memória virtual pode endereçar!');
        }
        else{
            self.ms().carregarProcesso(processo);
            self.tps.push(new TP(processo.id, n_paginas));
        }

    }

    self.buscarEntradaTLB = function(processo_id, n_pagina){
        var entradaTLB = null;
        $.each(self.tlb().entradas, function(index, entrada_tlb){
            if(entrada_tlb.processo_id() == processo_id && entrada_tlb.n_pagina() == n_pagina){
                entradaTLB = entrada_tlb;
                return false;
            }
        });
        return entradaTLB;
    }

    self.buscarEntradaTP = function(processo_id, n_pagina){
        var entradaTP = null;
        $.each(self.tps(), function(index, tp){
            if(tp.processo_id == processo_id){
                entradaTP = tp.entradas[n_pagina];
                return false;
            }
        });
        return entradaTP;
    }

    self.swapQuadro = function(processo_id,entrada_tp, n_pagina){
        var indice = self.mp().filaSubstituicao().unshift();
        if (entrada_tp.m())
            alert("Swap-Out da página para MS");
        alert("Swap-In página da MS para MP");
        entrada_tp.n_quadro(indice);
        entrada_tp.p(true);
        self.tlb().carregaEntrada(processo_id,n_pagina,entrada_tp);
    }

    self.retornarQuadroMP = function(processo_id, entrada_tp, n_pagina){
        var quadro, indiceQuadro;
        if(entrada_tp.p()){
            quadro = self.mp().quadros[entrada_tp.n_quadro()];
        }
        else{
            alert('Page Fault!');
            indiceQuadro = self.mp().getIndiceQuadroLivre();
            log(indiceQuadro);
            if(indiceQuadro != null){
                quadro = self.mp().getQuadro(indiceQuadro);
                entrada_tp.n_quadro(indiceQuadro);
                entrada_tp.p(true);
                self.tlb().carregaEntrada(processo_id,n_pagina,entrada_tp);
            }
            else{
                quadro = self.swapQuadro(processo_id, entrada_tp, n_pagina);
            }
            quadro.u(true);
        }
        if(entrada_tp.m()) self.mp().modificarQuadro(entrada_tp.n_quadro(),n_pagina)
        return quadro;
    }

    self.obterPaginaEndVirtual = function(end_virtual){
        return Math.floor(parseInt(end_virtual,2)/self.tam_quadro);
    }

    self.obterOffSetEndVirtual = function(end_virtual){
        return parseInt(end_virtual,2) % self.tam_quadro;
    }

    self.processaPedido = function(pedido){
        if(enderecoValido(pedido.endereco_virtual)){
            var quadro,
                n_pagina = self.obterPaginaEndVirtual(pedido.endereco_virtual),
                entrada_tlb = self.buscarEntradaTLB(pedido.processo_id, n_pagina),
                entrada_tp;
            if(entrada_tlb)
                entrada_tp = entrada_tlb.entrada_tp();
            else{
                entrada_tp = self.buscarEntradaTP(pedido.processo_id, n_pagina);
            }
            if(pedido.escrita) entrada_tp.m(true)
            quadro = self.retornarQuadroMP(pedido.processo_id,entrada_tp, n_pagina);
        }
        else{
            alert("Endereço inválido!");
        }
    }

    function enderecoValido(end_virtual){
        return (end_virtual.length < self.tam_endereco || self.obterOffSetEndVirtual(end_virtual) < self.tam_quadro)
    }

    function log2(n){
        return Math.log(n)/Math.log(2);
    }
}