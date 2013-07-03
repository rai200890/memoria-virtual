function MS(tamanho){
    var self = this;
    self.disponivel = ko.observable(tamanho);
    self.processos = ko.observableArray([]);

    self.carregarPaginas = function(processo){
        if (processo.tamanho <= self.disponivel()){
            self.processos.push(processo);
            self.disponivel(self.disponivel() - processo.tamanho);
        }
    }
    self.memoriaDisponivel = ko.computed(function(){
        if (self.disponivel() > 0)
            return "Memória Disponível: " + self.disponivel()
        else
            return "Memória Cheia"
    });
}