function HOD_Beh () {
    basic.pause(1000)
    if (HOD_PRED_milis + 1000 < control.millis()) {
        HOD_TED_milis = control.millis()
        HOD_s_b = (HOD_sec + Math.trunc((HOD_TED_milis - HOD_PRED_milis) / 1000)) % 60
        HOD_prenos = Math.trunc((HOD_sec + Math.trunc((HOD_TED_milis - HOD_PRED_milis) / 1000)) / 60)
        HOD_m_b = (HOD_prenos + HOD_min) % 60
        HOD_prenos = Math.trunc((HOD_prenos + HOD_min) / 60)
        HOD_hod = (HOD_prenos + HOD_hod) % 24
        HOD_sec = HOD_s_b
        HOD_min = HOD_m_b
        HOD_mili_b = (HOD_TED_milis - HOD_PRED_milis) % 1000
        HOD_PRED_milis = HOD_TED_milis - HOD_mili_b
    }
}
function HOD_on_strat () {
    HOD_PRED_milis = control.millis()
}
// a = array
function pridej_budik () {
    a_budik_y.push([6, 0, 24, 0, 1])
    a_budik_y.push([7, 30, 24, 1, 1])
    a_budik_y.push([13, 15, 3, 2, 1])
    a_budik_y.push([7, 0, 8, 3, 1])
}
function mam_zvonit () {
    for (let a_akt_budik of a_budik_y) {
        if (1 == a_akt_budik[4]) {
            if (HOD_hod >= a_akt_budik[0]) {
                if (HOD_min >= a_akt_budik[1]) {
                    a_akt_budik[0] = a_akt_budik[0] + a_akt_budik[2]
                    if (a_akt_budik[0] >= 24) {
                        a_akt_budik[0] = a_akt_budik[0] - 24
                        a_akt_budik[4] = 0
                    }
                    while (!(input.buttonIsPressed(Button.AB))) {
                        basic.showString("" + (a_nazvy_upozorneni[a_akt_budik[3]]))
                        basic.showString("" + HOD_hod + ":" + HOD_min)
                    }
                }
            }
        }
    }
}
function vypis2serial (hlaska: string, uroven: number) {
    if (uroven <= vypis_urovne) {
        serial.writeLine("[" + convertToText(uroven) + "] " + "[" + hlaska + "]")
    }
}
let HOD_mili_b = 0
let HOD_m_b = 0
let HOD_prenos = 0
let HOD_s_b = 0
let HOD_TED_milis = 0
let HOD_sec = 0
let HOD_min = 0
let HOD_hod = 0
let a_nazvy_upozorneni: string[] = []
let a_budik_y: number[][] = []
let vypis_urovne = 0
let HOD_PRED_milis = 0
let HOD_h_b = 0
HOD_PRED_milis = control.millis()
vypis_urovne = 4
a_budik_y = []
pridej_budik()
a_nazvy_upozorneni = ["vstavej", "cviceni", "tablety", "zalit kytky"]
HOD_on_strat()
HOD_hod = 13
HOD_min = 14
HOD_sec = 25
vypis2serial("pred nastav hodiny", 1)
vypis2serial("po nastav hodiny", 1)
vypis2serial("Cas: " + ("" + HOD_hod + ":" + HOD_min + ":" + HOD_sec), 1)
vypis2serial("Datum: " + kitronik_RTC.readDate(), 1)
/**
 * budík je pole
 * 
 * jeho hodnoty (parametry) jsou:
 * 
 * [cas nastavajiciho zazvoneni,
 * 
 * interval (opakovani) (h),
 * 
 * symbol]
 */
basic.forever(function () {
	
})
basic.forever(function () {
    HOD_Beh()
    vypis2serial("" + convertToText(HOD_hod) + " : " + convertToText(HOD_min) + " : " + convertToText(HOD_sec), 4)
})
basic.forever(function () {
    basic.showString("" + HOD_hod + ":" + HOD_min)
    mam_zvonit()
})
