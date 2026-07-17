// ==========================================
// LEYENDA DEL GEOVISOR
// ==========================================

const leyenda = L.control({ position: "bottomright" });

leyenda.onAdd = function () {

    const div = L.DomUtil.create("div", "info legend");

    div.innerHTML = `

    <div class="legend-box">

        <h4>Delegaciones Regionales Agropecuarias</h4>

        <div><span style="background:#f4e4da"></span>I Atlacomulco</div>

        <div><span style="background:#eaccc2"></span>II Jilotepec</div>

        <div><span style="background:#dcc9d9"></span>III Metepec</div>

        <div><span style="background:#dee8d7"></span>IV Valle de Bravo</div>

        <div><span style="background:#f6e7b5"></span>V Tejupilco</div>

        <div><span style="background:#99c3df"></span>VI Tenancingo</div>

        <div><span style="background:#f1bbcd"></span>VII Cuautitlán Izcalli</div>

        <div><span style="background:#f4f5f5"></span>VIII Zumpango</div>

        <div><span style="background:#c7e2ba"></span>IX Teotihuacán</div>

        <div><span style="background:#ceb9b5"></span>X Texcoco</div>

        <div><span style="background:#ade2e5"></span>XI Amecameca</div>

    </div>

    `;

    return div;

};

leyenda.addTo(mapa);