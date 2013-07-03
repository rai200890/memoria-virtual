function MemoriaVirtualViewModel(params){
    var self = this;
    var params = {
        tam_tlb : 10,
        tam_mp: 1024,
        tam_ms: 4096,
        tam_quadro : 64
    }

    self.novoProcesso = ko.observable(new Processo());
    self.pedidos = ko.observableArray([]);
    self.novoPedido = ko.observable(new Pedido({}));
    
    self.tpSelecionada = ko.observable(new TP(null, 0));

    self.mostrarTPSelecionada = function(tp){
        self.tpSelecionada(tp);
    }

    self.memoriaVirtual = new MemoriaVirtual(params);
   
    self.fazerPedido = function(){
        var pedido = self.novoPedido();
        var processo_id = pedido.processo_id;
        var end_virtual = parseInt(pedido.endereco_virtual,2);
        var escrita = pedido.escrita;
    }
    
    self.carregarProcesso = function(){
        self.memoriaVirtual.carregarProcesso(self.novoProcesso());
        self.novoProcesso(new Processo());
    }
}
