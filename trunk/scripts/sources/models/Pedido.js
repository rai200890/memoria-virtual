function Pedido(params){
    this.processo_id = (params.processo_id || null);
    this.escrita = (params.escrita || null);
    this.endereco_virtual = (params.endereco_virtual || null);
}