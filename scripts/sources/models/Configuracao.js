function Configuracao(params){
    var self = this;
    self.tam_tlb = (params.tam_tlb || '10');
    self.tam_mp = (params.tam_mp || '1024');
    self.tam_ms = (params.tam_ms || '4096');
    self.tam_quadro = (params.tam_quadro || '64');
    self.politica = (params.politica || 'FIFO');
    self.escopo_substituicao = (params.escopo_substituicao ||'GLOBAL');
    self.tam_endereco = (params.tam_endereco || '10');
}