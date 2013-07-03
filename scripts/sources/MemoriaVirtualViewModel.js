function MemoriaVirtualViewModel(params){
    var self = this;
    var params = {
        tam_tlb : 10,
        tam_mp: 1024,
        tam_ms: 4096,
        tam_quadro : 64
    }
    var n_quadros = Math.ceil(params.tam_mp/params.tam_quadro);

    self.novoProcesso = ko.observable(new Processo());
    self.pedidos = ko.observableArray([]);
    self.novoPedido = ko.observable(new Pedido({}));
    self.tpSelecionada = ko.observable(null);
    
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
        var memoriaVirtual = self.memoriaVirtual();
        memoriaVirtual.buscar(processo_id, end_virtual, escrita);
        self.memoriaVirtual(memoriaVirtual);
    }
    
    self.carregarProcesso = function(){
        var memoriaVirtual = self.memoriaVirtual();
        memoriaVirtual.carregarProcesso(self.novoProcesso());
        self.memoriaVirtual(memoriaVirtual);   //o q é isso?
        self.novoProcesso(new Processo());
    }
}
