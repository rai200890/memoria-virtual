function EntradaTP(){
    this.p = ko.observable(false);
    this.m = ko.observable(false);
    this.n_quadro = ko.observable(null);
}
//na escrita seta bit de modificado
//4 é o tamanho do conjunto residente
function TP(processo_id, n_entradas){
    var self = this;
    self.processo_id = processo_id;
    self.n_entradas = n_entradas;
    self.entradas = ko.observableArray([]);
    
    self.inicializar = function(){
       for(var i = 0; i < self.n_entradas;i++)
            self.entradas.push(new EntradaTP());
    }

    self.getEntrada = function(i){
        return self.entradas()[i];
    }

    self.carregaEntrada = function(i, n_quadro){
        var entrada = self.getEntrada(i);
        entrada.p(true);
        entrada.n_quadro(n_quadro);
    }

    self.modificaEntrada = function(i){
        var entrada = self.getEntrada(i);
        entrada.m(true);
    }
    
    self.conjuntoResidente = ko.computed(function(){
        var conjunto = [];
        $.each(self.entradas, function(index, entrada){
            if(entrada.p) conjunto[index] = entrada;
        });
        return conjunto;
    });
    self.inicializar();
}