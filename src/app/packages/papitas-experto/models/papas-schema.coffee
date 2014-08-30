###
numero,nombre,nombreAlternativo,significadoNombre,colorFlor,toleranciaGranizada,colorPulpa,formaRara,toleranciaHelada,usoCocina,lugar
###

Schemas = Schemas or {}
Schemas.Papa = new SimpleSchema
  nombre:
    type: String
    label: 'Nombre'
    max: 140

  numero:
    type: Number
    label: 'Número'
    unique: true
    min: 1
    max: 90

  nombreAlternativo:
    type: String
    label: 'Nombre alternativo'
    optional: true

  significadoNombre:
    type: String
    label: 'Significado del nombre'
    optional: true

  colorFlor:
    type: String
    label: 'Color principal de la flor'
    optional: true
    
  toleranciaGranizada:
    type: String
    label: 'Tolerancia a la granizada'
    optional: true
    
  colorPulpa:
    type: String
    label: 'Color principal de la pulpa del tubérculo'
    optional: true
    
  formaRara:
    type: String
    label: 'Forma rara'
    optional: true
    
  toleranciaHelada:
    type: String
    label: 'Tolerancia a la helada'
    optional: true

  usoCocina:
    type: String
    label: 'Uso en la cocina'
    optional: true

  audio:
    type: new SimpleSchema
      ini:
        type: Number
        label: 'Audio marker ini'
      dur:
        type: Number
        label: 'Audio duration'

  slug:
    type: String
    label: 'Slug'
    max: 140

  imageFileNameScreen:
    type: String
    label: 'Image file name (screen)'
    max: 140

  imageFileNamePrint:
    type: String
    label: 'Image file name (print)'
    max: 140


Papas = new Meteor.Collection 'papas', {connection: null}
Papas.attachSchema Schemas.Papa

Meteor.startup ->
  duracionAudio = 500
  for papa in papas
    nroStr = ('00'+papa.numero).slice(-3)
    papa.slug = "#{nroStr}-#{_.slugify papa.nombre}"
    papa.audio =
      ini: (papa.numero - 1)*duracionAudio
      dur: duracionAudio
    papa.imageFileNameScreen = "#{nroStr}.png"
    papa.imageFileNamePrint  = "#{nroStr}-print.png"
    Papas.insert papa
