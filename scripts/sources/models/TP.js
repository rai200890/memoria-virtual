function EntradaTP(){
    this.p = ko.observable(false);
    this.m = ko.observable(false);
    this.n_quadro = ko.observable(null);
}
//na escrita seta bit de modificado
function TP(processo_id, n_entradas){
    var self = this;
    self.processo_id = processo_id;
    self.n_entradas = n_entradas;
    self.entradas = ko.observableArray([]);
    
    self.inicializar = function(){
        for(var i = 0; i < self.n_entradas;i++)
            self.entradas.push(new EntradaTP());
    }

    self.carregarEntrada = function(i, n_quadro){
        var entrada = self.entradas()(i);
        entrada.p(true);
        entrada.n_quadro(n_quadro);
    }

    self.modificarEntrada = function(i){
        var entrada = self.entradas()(i);
        entrada.m(true);
    }
    
    self.conjuntoResidente = ko.computed(function(){
        var conjunto = [];
        $.each(self.entradas, function(index, entrada){
            if(entrada.p) conjunto.push({
                index : entrada
            });
        });
        return conjunto;
    });
    self.inicializar();
}