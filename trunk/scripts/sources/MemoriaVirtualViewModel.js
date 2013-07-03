function MemoriaVirtualViewModel(){
    var self = this;
    self.params = ko.observable({
        tam_tlb : 10,
        tam_mp: 1024,
        tam_ms: 4096,
        tam_quadro : 64
    });

    self.memoriaVirtual = ko.observable(new MemoriaVirtual(self.params()));

    self.novoProcesso = ko.observable(new Processo());
    self.novoPedido = ko.observable(new Pedido({}));
    self.tpSelecionada = ko.observable(new TP(null, 0));

    self.mostrarTPSelecionada = function(tp){
        self.tpSelecionada(tp);
    }

    self.iniciarMemoriaVirtual = function(){
        self.memoriaVirtual(new MemoriaVirtual(self.params()));
    }

    self.fazerPedido = function(){
        var pedido = self.novoPedido();
        var processo_id = pedido.processo_id;
        var end_virtual = parseInt(pedido.endereco_virtual,2);
        var escrita = pedido.escrita;
//        memoriaVirtual.buscar(processo_id, end_virtual, escrita);
    }
    
    self.carregarProcesso = function(){
        self.memoriaVirtual().carregarProcesso(self.novoProcesso());
        self.novoProcesso(new Processo());
    }
}
