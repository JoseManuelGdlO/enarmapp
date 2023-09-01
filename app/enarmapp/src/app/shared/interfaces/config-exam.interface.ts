export interface IConfigExam {
    id?: number
    idUsuario?: number
    subcategories?: string[]
    question_filters?: string[]
    idioma?: number
    numero_preguntas?: number
    simular_enarm?: boolean
    modo_examen?: string
}
export interface ISubtemas {
    response:[]
}