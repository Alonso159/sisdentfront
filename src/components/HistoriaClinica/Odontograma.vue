<template>
    <div class="odonto-cont">
        <div id="control" class="container">
            <div class="row">
                <div class="col-12 mt-2">
                    <div class="btn-group" role="group">
                        <input type="radio" class="btn-check" name="ferramenta" id="mouse" autocomplete="off" checked>
                        <label class="btn btn-secondary" for="mouse"><i class="fas fa-mouse-pointer"></i></label>
    
                        <input class="btn-check" type="radio" name="ferramenta" id="pincel" value="option1">
                        <label class="btn btn-secondary" for="pincel"><i class="fas fa-pencil-alt"></i></label>
    
                        <input class="btn-check" type="radio" name="ferramenta" id="borracha" value="option2">
                        <label class="btn btn-secondary" for="borracha"><i class="fas fa-eraser"></i></label>
    
                    </div>
                    <div class="btn-group" role="group">
                        <button id="configBtn" type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-cog"></i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                            <li style="margin: 5px;">
                                <label for="customRange2" class="form-label">Tamanho</label>
                                <input type="range" class="form-range" min="1" max="5" id="tamanhoPincel">
                            </li>
                            <li style="margin: 5px;">
                                <label for="customRange2" class="form-label">Cor</label>
                                <input type="color" id="corPincel" class="form-control form-control-color" value="#563d7c" title="Choose your color">
                            </li>
                            <li style="margin: 5px;">
                                <button id="limparDesenho" type="button" class="btn btn-secondary">
                                    Limpar desenhos
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button type="button" class="btn btn-secondary" id="saveBtn"><i class="fas fa-save"></i></button>
                </div>
            </div>
        </div>
        <div id="canva-group">
            <canvas id="camada1Odontograma"></canvas>
            <canvas id="camada2Odontograma"></canvas>
            <canvas id="camada3Odontograma"></canvas>
            <canvas id="camada4Odontograma"></canvas>
    
            <canvas id="camadaPincel"></canvas>
        </div>
        <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalLabel">Adicionar procedimento</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <input type="hidden" id="procedimentosRemovidos" th:field="*{procedimentosRemovidos}">
                            <div id="procedimentosDiv"></div>
                            <div class="form-group col-md-12">
                                <label for="nomeProcedimento">Nome</label>
                                <i data-type="info" class="fas fa-info-circle fa-1x text-info" onclick="toast_message('.','info')" style="margin-left: 5px; cursor: pointer;"></i>
                                <select class="form-control" id="nomeProcedimento">
                                    <option selected value="">-- Selecione uma opção --</option>
                                    <!-- <option th:value="${null}" th:text="${'NÃO INFORMADO'}"></option> -->
                                    <!-- <option th:each="model : ${modelEnums}" th:value="${model}" th:text="${model.denominacao}"></option> -->
                                </select>
                            </div>
                            <div class="form-group col-12" id="colOutroProcedimento">
                                <label for="outroProcedimento">Outro procedimento</label>
                                <i style="margin-left:5px;cursor: pointer;" class="alerta fas fa-info-circle fa-1x text-info" data-type="info" onclick="mensagens('.','info')"></i>
                                <input id="outroProcedimento" class="form-control" type="text">
                            </div>
                            <div class="form-group col-12">
                                <label for="exampleColorInput" class="form-label">Cor</label>
                                <i style="margin-left:5px;cursor: pointer;" class="alerta fas fa-info-circle fa-1x text-info" data-type="info" onclick="mensagens('.','info')"></i>
                                <input type="color" id="cor" disabled class="form-control form-control-color" value="#563d7c" title="Choose your color">
                            </div>
                            <div class="form-group col-12">
                                <label for="informacoesAdicionais">Informações adicionais</label>
                                <i style="margin-left:5px;cursor: pointer;" class="alerta fas fa-info-circle fa-1x text-info" data-type="info" onclick="mensagens('.','info')"></i>
                                <textarea rows="5" id="informacoesAdicionais" maxlength="5000" class="form-control"></textarea>
                            </div>
                            <div class="form-group col-md-1 d-inline mt-2" style="text-align: center; margin: auto;">
                                <a id="botaoAdicionar" class="form-control btn-sigsaude btnCorNovo">
                                    <i class="fas fa-plus"></i>
                                </a>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <div class="panel panel-default">
                                    <div class="table-responsive">
                                        <table class="table display dataTable table-bordered table-striped" id="tabelaTestesEspecificosForm">
                                            <thead>
                                                <tr>
                                                    <th>NOME</th>
                                                    <th>COR</th>
                                                    <th>INFORMAÇÕES ADICIONAIS</th>
                                                    <th class="text-center">AÇÕES</th>
                                                </tr>
                                            </thead>
                                            <tbody id="bodyProcedimentos">
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="modal fade" id="configuracoesFerramenta" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ...
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </template>

  <script>
  import localStyles from '../../assets/css/styleodo.css';
  import localScript from '../../assets/js/app/pincel.js';
  import localScript2 from '../../assets/js/app/odontograma.js';

  export default {
    mounted() {
      this.loadStyles();
      this.loadScripts();
    },
    methods: {
      loadStyles() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
        document.head.appendChild(link);
        
        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(link2);

        const link3 = document.createElement('link');
        link3.rel = 'stylesheet';
        link3.href = '../../assets/css/styleodo.css';
        document.head.appendChild(link3);
      },
      loadScripts() {
  
        const script2 = document.createElement('script');
        script2.src = '../../assets/js/app/pincel.js';
        document.head.appendChild(script2);
        // eval(script2.textContent);

        const script3 = document.createElement('script');
        script3.src = '../../assets/js/app/odontograma.js';
        document.head.appendChild(script3);
        
        // eval(script3.textContent); // Ejecutar el contenido del script utilizando eval()

        const script1 = document.createElement('script');
        script1.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js';
        script1.async = true;
        document.body.appendChild(script1);
      }
    },
  };
  </script>



  <style scoped>
  :root {
    --header-height: 3rem;
    --nav-width: 68px;
    --first-color: #00171b;
    --first-color-light: #8ac7ca;
    --secondary-color: #003d47;
    --secondary-color-light: #0c9aba;
    --white-color: #F7F6FB;
    --body-font: 'Nunito', sans-serif;
    --normal-font-size: 1rem;
    --z-fixed: 100;
    --backgound: linear-gradient(90deg, rgba(0, 25, 29, 1) 0%, var(--first-color) 35%, var(--secondary-color) 100%);
}

.odonto-cont {
    position: relative;
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    transition: .5s;
    height: 100%;
    /* background: var(--backgound); */
}

#camada1Odontograma {
    z-index: 1;
}

#camada2Odontograma {
    z-index: 2;
}

#camada3Odontograma {
    z-index: 3;
}

#camada4Odontograma {
    z-index: 4;
}

#camadaPincel {
    z-index: 3;
}

canvas {
    position: absolute;
    border: 1px solid #9C9898;
    margin: 10px;
}

.checked {
    display: none;
}

.active .checked {
    display: inline-block;
}

.active .unchecked {
    display: none;
}
  </style>
  