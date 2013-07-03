function Quadro(){
    this.u = ko.observable(false);
    this.m = ko.observable(false);
    this.pagina = ko.observable(null);
}
function MP(n_quadros){
    var self = this;
    self.n_quadros = n_quadros;
    self.quadros = [];

    self.inicializar = function(){
        for(var i=0; i< self.n_quadros; i++){
            self.quadros.push(new Quadro());
        }
    };

    self.carregarQuadro = function(i, pagina){
        var quadro = self.quadros[i];
        quadro = pagina;
        quadro.u(true);
    }
    
    self.modificarQuadro = function(i,pagina){
        var quadro = self.quadros[i];
        quadro.pagina = pagina;
        quadro.m(true);
    }
    
    self.getQuadro = function(i){
        return self.quadros[i];
    }
    
    self.getQuadroLivre = function(){
        var index = null;
        var quadro = null;
        for(var i=0; i < self.n_quadros; i++){
            quadro = self.getQuadro(i);
            if(quadro.u() == false)
                return i;
        }
        return index;
    }
    self.inicializar();
}
