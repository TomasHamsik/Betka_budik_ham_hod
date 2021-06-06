// a = array
function pridej_budik () {
    a_budik_y.push([6, 0, 24, 0])
    a_budik_y.push([7, 30, 24, 1])
    a_budik_y.push([13, 15, 3, 2])
    a_budik_y.push([7, 0, 8, 3])
}
function mam_zvonit () {
    for (let a_akt_budik of a_budik_y) {
        if (kitronik_RTC.readHours() >= a_akt_budik[0]) {
            if (kitronik_RTC.readMinutes() >= a_akt_budik[1]) {
                basic.showString("" + (a_nazvy_upozorneni[a_akt_budik[3]]))
            }
        }
    }
}
function vypis2serial (hlaska: string, uroven: number) {
    if (uroven <= vypis_urovne) {
        serial.writeLine("[" + convertToText(uroven) + "] " + "[" + hlaska + "]")
    }
}
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
let HOD_m_b = 0
let HOD_prenos = 0
let HOD_s_b = 0
let HOD_mili_b = 0
let TED_milis = 0
let a_nazvy_upozorneni: string[] = []
let a_budik_y: number[][] = []
let vypis_urovne = 0
let HOD_h_b = 0
let pred_milis = control.millis()
vypis2serial("pred_milis: " + pred_milis, 1)
vypis_urovne = 2
vypis2serial("start", 1)
vypis2serial("10/3: " + convertToText(10 / 3), 1)
vypis2serial("rem 10/3: " + convertToText(10 % 3), 1)
a_budik_y = []
pridej_budik()
a_nazvy_upozorneni = ["vstavej", "cviceni", "tablety", "zalit kytky"]
let HOD_hod = 23
let HOD_min = 59
let HOD_sec = 55
vypis2serial("pred nastav hodiny", 1)
vypis2serial("po nastav hodiny", 1)
vypis2serial("Cas: " + ("" + HOD_hod + ":" + HOD_min + ":" + HOD_sec), 1)
vypis2serial("Datum: " + kitronik_RTC.readDate(), 1)
basic.forever(function () {
    mam_zvonit()
})
basic.forever(function () {
    basic.pause(1150)
    if (pred_milis + 1000 < control.millis()) {
        TED_milis = control.millis()
        vypis2serial("" + "___\ndist_milis: " + (TED_milis - pred_milis), 1)
        HOD_s_b = (HOD_sec + Math.trunc((TED_milis - pred_milis) / 1000)) % 60
        HOD_prenos = Math.trunc((HOD_sec + Math.trunc((TED_milis - pred_milis) / 1000)) / 60)
        vypis2serial("HOD_sec: " + HOD_sec + " pren2min: " + HOD_prenos, 1)
        HOD_m_b = (HOD_prenos + HOD_min) % 60
        HOD_prenos = Math.trunc((HOD_prenos + HOD_min) / 60)
        vypis2serial("HOD_min: " + HOD_min + " pren2hod: " + HOD_prenos, 1)
        HOD_hod = (HOD_prenos + HOD_hod) % 24
        HOD_sec = HOD_s_b
        HOD_min = HOD_m_b
        HOD_mili_b = (TED_milis - pred_milis) % 1000
        pred_milis = TED_milis - HOD_mili_b
        vypis2serial("Cas: " + ("" + HOD_hod + ":" + HOD_min + ":" + HOD_sec + "\n____"), 1)
    }
})
