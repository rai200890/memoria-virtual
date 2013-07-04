function Quadro(){
    this.u = ko.observable(false);
    this.m = ko.observable(false);
    this.pagina = ko.observable(null);
}
function MP(n_quadros, politica){
    var self = this;
    self.politica = politica;
    self.n_quadros = n_quadros;
    self.quadros = [];
    self.filaSubstituicao = ko.observableArray([]);

    self.queue = function(quadroIndice){
        var pos = $.inArray(quadroIndice, self.filaSubstituicao());
        if(pos != -1)
            self.filaSubstituicao(self.filaSubstituicao().splice(pos,1));

        if(self.filaSubstituicao.length > self.n_quadros)
            self.filaSubstituicao.unshift();

        self.filaSubstituicao.push(quadroIndice);
    }

    self.inicializar = function(){
        for(var i=0; i< self.n_quadros; i++){
            self.quadros.push(new Quadro());
        }
    };

    self.carregarQuadro = function(i, pagina){
        var quadro = self.quadros[i];
        quadro = pagina;
        quadro.u(true);
        self.queue(i);
    }

    self.modificarQuadro = function(i,pagina){
        var quadro = self.quadros[i];
        quadro.pagina = pagina;
        quadro.m(true);
        if (self.politica == "LRU")
            self.queue(i);
    }

    self.getQuadro = function(i){
        if (self.politica == "LRU")
            self.queue(i);
        return self.quadros[i];
    }

    self.getIndiceQuadroLivre = function(){
        var index;
        $.each(self.quadros,function(i, quadro){
            index = i;
            if(!quadro.u()) return false;
        })
        return index;
    }
    self.inicializar();
}
