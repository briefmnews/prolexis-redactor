/****************************************************/
/************** Début configuration *****************/
/****************************************************/

var sDiagPlWsUrlProxy = "http://prolexis.localhost/prolexis-proxy/";


/****************************************************/
/*************** Fin configuration ******************/
/****************************************************/

//
function loadJsFile(filename){
  var fileref = top.document.createElement('script');
  fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("charset", "utf-8");
  fileref.setAttribute("src", filename);
  top.document.getElementsByTagName("head")[0].appendChild(fileref);
}

if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.prolexis = function()
{
    return {
        init: function ()
        {
            var button = this.button.add('prolexis', 'Prolexis');
            this.button.addCallback(button, this.prolexis.prolexis);

            loadJsFile('../vendor/prolexis/core/DiagPlWsLoader.js');
        },
        prolexis: function(editor, diagPlWsCallBack)
        {
            // Initialisation de la callback
            diagPlWsCallBack = diagPlWsCallBack || null;
            
            // Initialisation
            //
            top.DiagPlWsLoader().init({ sUrlProxy: sDiagPlWsUrlProxy,
                sCorePath: '../vendor/prolexis/core',
                sourceId: this.$editor[0],
                hCallBack: this.prolexis.insert,
                sEditor: "redactor",
                oWindow: window});

            // Lancement de l'analyse du texte
            
            top.DiagPlWsLoader().analyze();
        },
		insert: function()
		{
			this.code.sync();
		}
    };
};
