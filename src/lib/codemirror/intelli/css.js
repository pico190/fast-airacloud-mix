import { console_error } from "../../debug/console";

        export async function completeCSS(context, extraintellis) {
            let before = context.matchBefore(/\w+/);
            var obj = {};

            var word = window.aira.editor.getPositionType();
            var welem = window.aira.editor.getPositionElem();

            var pv = welem.previousElementSibling?.previousElementSibling;
            if (pv === null) {
                let current = welem;
                while (current.parentElement.tagName === "SPAN") {
                    current = current.children[0];
                }
                pv = current;
            }
            console.log(pv);
            try {
                var propertyName = window.aira.editor.getElementType(pv);
            } catch (Err) {
                console.error(Err);
                var propertyName = null;
            }
            if (word.includes("property-name") || word.includes("tag-name")) {
                obj = {
                    from: before?.from,
                    options: extraintellis.properties,
                };
            } else if (propertyName.includes("property-name")) {
                var content = welem.innerText;
                const elem = extraintellis.properties.find(obj => obj.name === content);
                var optionsList = [];
                elem.values.forEach(value => {
                    if(!value.startsWith("<") && !value.endsWith(">")) {
                        optionsList.push({
                            label: value,
                            type: "values-and-enumerations",
                            info: "",
                            detail: "",
                            apply: value + ";"
                        })
                    } else {
                        var valtype = value.replace("<", "").replace(">", "");
                        console.log(valtype);
                        switch(valtype) {
                            case "absolute-size":
                                extraintellis.absoluteUnits.forEach(absoluteUnit => {
                                    optionsList.push({
                                        label: absoluteUnit.label,
                                        type: absoluteUnit.type,
                                        info: "",
                                        detail: "",
                                        apply: absoluteUnit.apply
                                    })
                                })
                            case "border-style":
                                var bStyles = ["dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset"]
                                bStyles.forEach(bStyle => {
                                    optionsList.push({
                                        label: bStyle,
                                        type: "values-and-enumerations",
                                        info: "",
                                        detail: "",
                                        apply: bStyle + ";"
                                    })
                                })
                            case "color":
                                extraintellis.colors.forEach(color => {
                                    optionsList.push({
                                        label: color.label,
                                        type: color.type,
                                        info: "",
                                        detail: "",
                                        apply: color.apply
                                    })
                                })
                            case "length":
                            case "line-height":
                                extraintellis.absoluteUnits.forEach(absoluteUnit => {
                                    optionsList.push({
                                        label: absoluteUnit.label,
                                        type: absoluteUnit.type,
                                        info: "",
                                        detail: "",
                                        apply: absoluteUnit.apply
                                    })
                                })
                                extraintellis.relativeUnits.forEach(relativeUnit => {
                                    optionsList.push({
                                        label: relativeUnit.label,
                                        type: relativeUnit.type,
                                        info: "",
                                        detail: "",
                                        apply: relativeUnit.apply
                                    })
                                })
                            case "family-name":
                                var families = ["'Courier New', Courier, monospace", "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif", "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif", "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", "'Times New Roman', Times, serif", "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif", "Arial, Helvetica, sans-serif", "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif", "Georgia, 'Times New Roman', Times, serif", "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", "Verdana, Geneva, Tahoma, sans-serif"]
                                families.forEach(family => {
                                    optionsList.push({
                                        label: family,
                                        type: "values-and-enumerations",
                                        info: "",
                                        detail: "",
                                        apply: family + ";"
                                    })
                                })
                            case "feature-tag-value":
                                var featureTagValues = [
                                        "'aalt'",
                                        "'abvf'",
                                        "'abvm'",
                                        "'abvs'",
                                        "'afrc'",
                                        "'akhn'",
                                        "'blwf'",
                                        "'blwm'",
                                        "'blws'",
                                        "'calt'",
                                        "'case'",
                                        "'ccmp'",
                                        "'cfar'",
                                        "'cjct'",
                                        "'clig'",
                                        "'cpct'",
                                        "'cpsp'",
                                        "'cswh'",
                                        "'curs'",
                                        "'cv01'", "'cv02'", "'cv03'", "'cv04'", "'cv05'", "'cv06'", "'cv07'", "'cv08'", "'cv09'", "'cv10'",
                                        "'cv11'", "'cv12'", "'cv13'", "'cv14'", "'cv15'", "'cv16'", "'cv17'", "'cv18'", "'cv19'", "'cv20'",
                                        "'cv21'", "'cv22'", "'cv23'", "'cv24'", "'cv25'", "'cv26'", "'cv27'", "'cv28'", "'cv29'", "'cv30'",
                                        "'cv31'", "'cv32'", "'cv33'", "'cv34'", "'cv35'", "'cv36'", "'cv37'", "'cv38'", "'cv39'", "'cv40'",
                                        "'cv41'", "'cv42'", "'cv43'", "'cv44'", "'cv45'", "'cv46'", "'cv47'", "'cv48'", "'cv49'", "'cv50'",
                                        "'cv51'", "'cv52'", "'cv53'", "'cv54'", "'cv55'", "'cv56'", "'cv57'", "'cv58'", "'cv59'", "'cv60'",
                                        "'cv61'", "'cv62'", "'cv63'", "'cv64'", "'cv65'", "'cv66'", "'cv67'", "'cv68'", "'cv69'", "'cv70'",
                                        "'cv71'", "'cv72'", "'cv73'", "'cv74'", "'cv75'", "'cv76'", "'cv77'", "'cv78'", "'cv79'", "'cv80'",
                                        "'cv81'", "'cv82'", "'cv83'", "'cv84'", "'cv85'", "'cv86'", "'cv87'", "'cv88'", "'cv89'", "'cv90'",
                                        "'cv91'", "'cv92'", "'cv93'", "'cv94'", "'cv95'", "'cv96'", "'cv97'", "'cv98'", "'cv99'",
                                        "'dlig'",
                                        "'dist'",
                                        "'dnom'",
                                        "'dtls'",
                                        "'expt'",
                                        "'falt'",
                                        "'fin2'",
                                        "'fin3'",
                                        "'fina'",
                                        "'flac'",
                                        "'frac'",
                                        "'fwid'",
                                        "'half'",
                                        "'haln'",
                                        "'halt'",
                                        "'hist'",
                                        "'hkna'",
                                        "'hlig'",
                                        "'hngl'",
                                        "'hojo'",
                                        "'hwid'",
                                        "'init'",
                                        "'isol'",
                                        "'ital'",
                                        "'jalt'",
                                        "'jp04'",
                                        "'jp78'",
                                        "'jp83'",
                                        "'jp90'",
                                        "'kern'",
                                        "'lfbd'",
                                        "'liga'",
                                        "'ljmo'",
                                        "'lnum'",
                                        "'locl'",
                                        "'ltra'",
                                        "'ltrm'",
                                        "'mark'",
                                        "'med2'",
                                        "'medi'",
                                        "'mgrk'",
                                        "'mkmk'",
                                        "'mset'",
                                        "'nalt'",
                                        "'nlck'",
                                        "'nukt'",
                                        "'numr'",
                                        "'onum'",
                                        "'opbd'",
                                        "'ordn'",
                                        "'ornm'",
                                        "'palt'",
                                        "'pcap'",
                                        "'pkna'",
                                        "'pnum'",
                                        "'pref'",
                                        "'pres'",
                                        "'pstf'",
                                        "'psts'",
                                        "'pwid'",
                                        "'qwid'",
                                        "'rand'",
                                        "'rclt'",
                                        "'rkrf'",
                                        "'rlig'",
                                        "'rphf'",
                                        "'rtbd'",
                                        "'rtla'",
                                        "'rtlm'",
                                        "'ruby'",
                                        "'rvrn'",
                                        "'salt'",
                                        "'sinf'",
                                        "'size'",
                                        "'smcp'",
                                        "'smpl'",
                                        "'ssty'",
                                        "'stch'",
                                        "'subs'",
                                        "'sups'",
                                        "'swsh'",
                                        "'titl'",
                                        "'tjmo'",
                                        "'tnam'",
                                        "'tnum'",
                                        "'trad'",
                                        "'twid'",
                                        "'unic'",
                                        "'valt'",
                                        "'vatu'",
                                        "'vert'",
                                        "'vhal'",
                                        "'vjmo'",
                                        "'vkna'",
                                        "'vkrn'",
                                        "'vpal'",
                                        "'vrt2'",
                                        "'zero'"
                                ];

                                featureTagValues.forEach(featureTagValue => {
                                    optionsList.push({
                                        label: featureTagValue,
                                        type: "values-and-enumerations",
                                        info: "",
                                        detail: "",
                                        apply: featureTagValue + ";"
                                    })
                                })
                        }
                    }
                })
                obj = {
                    from: before?.from,
                    options: extraintellis.properties,
                };
            }
            return obj;
        }