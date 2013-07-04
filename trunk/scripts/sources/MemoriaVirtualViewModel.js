function MemoriaVirtualViewModel(){
    var self = this;
    self.params = ko.observable({
        tam_tlb : 10,
        tam_mp: 1024,
        tam_ms: 4096,
        tam_quadro : 64,
        politica : 'LRU',
        escopo_substituicao: null,
        tam_endereco : 10
    });
    self.politicas =
    self.memoriaVirtual = ko.observable(new MemoriaVirtual(self.params()));

    self.novoProcesso = ko.observable(new Processo());
    self.novoPedido = ko.observable(new Pedido({}));
    self.tpSelecionada = ko.observable(null);

    self.mostrarTPSelecionada = function(tp){
        self.tpSelecionada(tp);
    }

    self.iniciarMemoriaVirtual = function(){
        self.memoriaVirtual(new MemoriaVirtual(self.params()));
    }

    self.fazerPedido = function(){
        self.memoriaVirtual().processaPedido({
            endereco_virtual : self.novoPedido().endereco_virtual,
            processo_id : self.novoPedido().processo_id,
            escrita : self.novoPedido().escrita
        });
    }

    self.carregarProcesso = function(){
        self.memoriaVirtual().carregarProcesso(self.novoProcesso());
        self.novoProcesso(new Processo());
    }
}
