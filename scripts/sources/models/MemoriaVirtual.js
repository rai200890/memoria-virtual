function MemoriaVirtual(params){
    var self = this;
    self.tam_mp = parseInt(params.tam_mp);
    self.tam_ms = parseInt(params.tam_ms);
    self.tam_quadro = parseInt(params.tam_quadro)
    self.n_quadros = Math.ceil(self.tam_mp/self.tam_quadro);

    self.tlb = new TLB();
    self.mp = new MP(self.n_quadros);
    self.ms = new MS(self.tam_ms);
    self.tps = ko.observableArray([]);

    self.indexOfTP = function(processo_id){
        var resposta = null;
        $.each(self.tps, function(index, tp){
            if (tp.id == processo_id)
                resposta = index;
        });
        return resposta;
    }

    self.carregarProcesso = function(processo){
        self.ms.carregarProcesso(processo);
        var n_paginas = Math.ceil(processo.tamanho/params.tam_quadro);
        self.tps.push(new TP(processo.id, n_paginas));
    }

    self.buscaEntradaProcessoTLB = function(processo_id, end_virtual){
        var n_pagina = self.obtemPaginaEndVirtual(end_virtual)
        var entradaTpProcesso = null;
        $.each(self.tlb(), function(index, entrada_tlb){
            if(entrada_tlb.processo_id == processo_id && entrada_tlb.n_pagina == n_pagina){
                entradaTpProcesso = entrada_tlb.entrada_tp;
                return;
            }
        })
        return entradaTpProcesso;
    }

    self.buscaEntradaProcessoTP = function(processo_id, end_virtual){
        var n_pagina = self.obtemPaginaEndVirtual(end_virtual)
        var entradaTpProcesso = null;
        $.each(self.tps(), function(index, tp){
            if(tp.processo_id == processo_id){
                entradaTpProcesso = tp.entradas[n_pagina];
                return;
            }
        })
        self.atualizaTLB(tp_entrada);
        return entradaTpProcesso;
    }
}

    self.retornaQuadro = function(entrada_tp){
        var quadro;
        if(entrada_tp.p()){
            quadro = self.mp.quadros[entrada_tp.n_quadro];
        }
        else{
            alert('Page Fault!');
            self.carregaPaginaMP(self.retornaPaginaMS());
        }
        return quadro;
    }

    self.obtemPaginaEndVirtual = function(end_virtual){
        return Math.floor(end_virtual/self.tam_quadro);
    }

    self.obtemOffSetEndVirtual = function(end_virtual){
        return end_virtual % self.tam_quadro;
    }
//
//    self.buscar = function(processo_id, end_virtual, escrita){
//        var indexTP = self.indexOfTP(processo_id);
//        var tp = self.tps[indexTP];
//        if(tp){
//            var n_pagina =
//            var entrada_tp = tp.entradas[n_pagina];
//            if (entrada_tp.p) {
//                if(escrita){
//                    tp.modificaEntrada(n_pagina);
//                    //grava no quadro na MP
//                    //rever
//
//                }
//            }else
//                alert("Falta de Página");
//            var indexQuadroLivre = self.mp.getQuadroLivre();
//            if (indexQuadroLivre != null){
//                var entrada = tp.entradas[n_pagina];
//                entrada.n_quadro = indexQuadroLivre;
//                entrada.p = true;
//                tp.entradas[n_pagina] = entrada;
//                self.tps[indexTP] = tp;
//                var quadro = self.mp.quadros[indexQuadroLivre];
//                quadro.u = true;
//                self.mp.quadros[indexQuadroLivre] = quadro;
//            }else {
//                //chama a politica de substituiçao
//                //se o quadro foi modificado, faz o swap-out da pagina
//            }
//        }else
//            alert("Processo Não Existe");
//    }
}
