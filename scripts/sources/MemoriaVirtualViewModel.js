function MemoriaVirtualViewModel(){
    var self = this;
    self.params = ko.observable(new Configuracao({}));

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
        self.memoriaVirtual().processaPedido(self.novoPedido());
    }

    self.carregarProcesso = function(){
        self.memoriaVirtual().carregarProcesso(self.novoProcesso());
        self.novoProcesso(new Processo());
    }
}
