function Pedido(params){
    var self = this;
    self.processo_id = (params.processo_id || null);
    self.escrita = (params.escrita || false);
    self.endereco_virtual = (params.endereco_virtual || null);
}