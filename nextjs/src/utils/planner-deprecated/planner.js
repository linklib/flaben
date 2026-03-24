// SECTION Types

// MODULE Declarations

/**
 * @template {{ name: string }} E
 *
 * @typedef {{
 *   readonly value: string
 *   readonly error: E | null
 *   readonly editable: boolean
 *  }} StringField
 */

/** @typedef {ReadonlyArray<Json>} JsonArray */

/** @typedef {{ readonly [key: string]: Json | undefined }} JsonRecord */

/** @typedef {boolean | number | string | null | JsonRecord | JsonArray | readonly []} Json */

/** @template T @typedef {T extends Function ? T : { [K in keyof T]: T[K] } & unknown} Compute */

/** @template {ReadonlyArray<any>} A @typedef {A extends ReadonlyArray<infer T> ? T : never} ArrayElem */

/** @template {string} K, O @typedef {Compute<O extends infer U ? U extends { [Key in K]: infer L } ? L extends infer _ ? U : never : U : never>} Derive */

// MODULE Model

/** @typedef {160 | 200} IsoPipeDiameter */

/** @typedef {'classic' | 'slim'} ProductLine */

/** @typedef {6 | 10 | 12} SlimCollectorHoles */

/** @typedef {8 | 16 | 24} ClassicCollectorHoles */

/**
 * @typedef {(
 * | {
 *   type: 'air_duct' // Р’РѕР·РґСѓС…РѕРІРѕРґ
 *   line: ProductLine
 * }
 * | {
 *   type: 'mounting_clip' // РњРѕРЅС‚Р°Р¶РЅР°СЏ РєР»РёРїСЃР°
 *   line: ProductLine
 * }
 * | {
 *   type: 'seal_ring' // СѓРїР»РѕС‚РЅРёС‚РµР»СЊРЅРѕРµ РєРѕР»СЊС†Рѕ
 * }
 * | {
 *   type: 'connector_classic' // РєР»Р°СЃСЃРёС‡РµСЃРєРёР№ РєРѕРЅРЅРµРєС‚РѕСЂ
 * }
 * | {
 *   type: 'connector_slim_1' // РїР»РѕСЃРєРёР№ РєРѕРЅРЅРµРєС‚РѕСЂ РЅР° 1 РѕС‚РІРµСЂСЃС‚РёРµ
 * }
 * | {
 *   type: 'connector_slim_3' // РїР»РѕСЃРєРёР№ РєРѕРЅРЅРµРєС‚РѕСЂ РЅР° 3 РѕС‚РІРµСЂСЃС‚РёСЏ
 * }
 * | {
 *   type: 'air_duct_plug' // Р·Р°С‰РёС‚РЅР°СЏ Р·Р°РіР»СѓС€РєР° РґР»СЏ РІРѕР·РґСѓС…РѕРІРѕРґР°
 *   line: ProductLine
 * }
 * | {
 *   type: 'vent_knife' // РІРµРЅС‚РёР»СЏС†РёРѕРЅРЅС‹Р№ РЅРѕР¶
 * }
 * | {
 *   type: 'connector_volume_regulation_valve' // РєР»Р°РїР°РЅ СЂРµРіСѓР»РёСЂРѕРІРєРё РѕР±СЉС‘РјР° РІРѕР·РґСѓС…Р° РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РєРѕРЅРЅРµРєС‚РѕСЂР°
 * }
 * | {
 *   type: 'collector' // РєР»Р°СЃСЃРёС‡РµСЃРєРёР№ РєРѕР»Р»РµРєС‚РѕСЂ
 *   line: 'classic'
 *   holes: ClassicCollectorHoles
 * }
 * | {
 *   type: 'collector' // РїР»РѕСЃРєРёР№ РєРѕР»Р»РµРєС‚РѕСЂ
 *   line: 'slim'
 *   holes: SlimCollectorHoles
 * }
 * | {
 *   type: 'collector_plug' // Р·Р°С‰РёС‚РЅР°СЏ Р·Р°РіР»СѓС€РєР° РґР»СЏ РєРѕР»Р»РµРєС‚РѕСЂР°
 *   line: ProductLine
 * }
 * | {
 *   type: 'diffuser' // РґРёС„С„СѓР·РѕСЂ
 * }
 * | {
 *   type: 'silencer' // С€СѓРјРѕРіР»СѓС€РёС‚РµР»СЊ
 *   diameter: IsoPipeDiameter
 * }
 * | {
 *   type: 'iso_pipe' // ISO-С‚СЂСѓР±Р°
 *   diameter: IsoPipeDiameter
 * }
 * | {
 *   type: 'iso_pipe_coupling' // ISO-РјСѓС„С‚Р° СЃРѕРµРґРёРЅРёС‚РµР»СЊРЅР°СЏ
 *   diameter: IsoPipeDiameter
 * }
 * | {
 *   type: 'iso_pipe_clamp' // С…РѕРјСѓС‚ РґР»СЏ ISO РІРѕР·РґСѓС…РѕРІРѕРґРѕРІ
 *   diameter: IsoPipeDiameter
 * }
 * | {
 *   type: 'electric_valve' // ISO СЌР»РµРєС‚СЂРѕ РєР»Р°РїР°РЅ
 *   diameter: IsoPipeDiameter
 * }
 * | {
 *   type: 'vent_hood' // РІРµРЅС‚РёР»СЏС†РёРѕРЅРЅС‹Р№ РєР°РїСЋС€РѕРЅ РёР· РЅРµСЂР¶Р°РІРµСЋС‰РµР№ СЃС‚Р°Р»Рё
 *   diameter: IsoPipeDiameter
 * }
 * | {
 *   type: 'panel_1' // РџР°РЅРµР»СЊ СЃ РѕРґРЅРѕР№ С‰РµР»СЊСЋ, РґР»СЏ РЅР°РїРѕР»СЊРЅРѕРіРѕ РєРѕРЅРЅРµРєС‚РѕСЂР° РЅР° 1 РІС‹С…РѕРґ
 * }
 * | {
 *   type: 'panel_3' // РџР°РЅРµР»СЊ СЃ РѕРґРЅРѕР№ С‰РµР»СЊСЋ, РґР»СЏ РЅР°РїРѕР»СЊРЅРѕРіРѕ РєРѕРЅРЅРµРєС‚РѕСЂР° РЅР° 3 РІС‹С…РѕРґР°
 * }
 * | {
 *   type: 'outlet' // РћС‚РІРѕРґ
 *   diameter: IsoPipeDiameter
 * }
 * )} ProductInfo
 */

/**
 * @typedef {{
 *   id: number
 *   name: string
 *   price: number
 *   image: string
 * }} DBProductData
 */

/** @typedef {DBProductData & { count: number }} FinalProductData */

/**
 * @typedef {(
 *  & ProductInfo
 *  & { count: number }
 * )} Product
 */

/** @typedef {{ [K in Product['type']]: Product & { type: K } }} _Products */

/**
 * @typedef {{
 *   [K in keyof _Products]: _Products[K] extends { line: any }
 *     ? {
 *       [L in ProductLine]: { count: number } extends Omit<Product & { type: K, line: L }, 'type' | 'line'>
 *         ? number
 *         : Omit<Product & { type: K, line: L }, 'type' | 'line'> | 0
 *     }
 *     : { count: number } extends Omit<_Products[K], 'type' | 'line'>
 *       ? number
 *       : Omit<_Products[K], 'type' | 'line'>
 * }} Products
 */

/** @typedef {'bottom' | 'top'} SupplyType */

/** @typedef {'bottom' | 'top'} ExhaustType */

/** @typedef {'supply' | 'exhaust'} RoomType */

/** @typedef {'roof' | 'wall'} AirExchangeType */

/** @typedef {'standard' | 'flex'} SilencerType */

/** @typedef {'standard' | 'comfort'} ComfortType */

/** @typedef {'classic' | 'combined'} ChosenProductLine */

/** @typedef {'living-room' | 'business-room'} PeopleDependentRoomType */

/** @typedef {'family-room' | 'universal-room'} PeopleIndependentRoomType */

/** @typedef {PeopleDependentRoomType | PeopleIndependentRoomType} SupplyRoomType */

/**
 * @typedef {(
 *  & (
 *  | {
 *    readonly square: ''
 *    readonly width: string
 *    readonly length: string
 *  }
 *  | {
 *    readonly width: ''
 *    readonly length: ''
 *    readonly square: string
 *  }
 *  )
 *  & (
 *  | (
 *    & {
 *      readonly type: 'supply'
 *      readonly supplyRoomType: SupplyRoomType
 *    }
 *    & (
 *    | {
 *      readonly peopleCount: string
 *      readonly supplyRoomType: PeopleDependentRoomType
 *    }
 *    | {
 *      readonly supplyRoomType: PeopleIndependentRoomType
 *    }
 *    )
 *  )
 *  | {
 *    readonly type: 'exhaust'
 *  }
 *  )
 *  & {
 *    readonly name: string
 *    readonly minAirTraffic?: number
 *    readonly airTraffic: string | null
 *  }
 * )} Room
 */

/**
 * @typedef {{
 *   readonly height: string
 *   readonly enabled: boolean
 *   readonly rooms: ReadonlyArray<Room>
 * }} Stage
 */

/**
 * @typedef {(
 *  & {
 *    name: 'room-edit'
 *    roomName: string
 *    stage: number
 *    room: number
 *  }
 *  & (
 *  | {
 *    readonly square: ''
 *    readonly width: string
 *    readonly length: string
 *   }
 *   | {
 *    readonly width: ''
 *    readonly length: ''
 *    readonly square: string
 *   }
 *  )
 * )} RoomEditModal
 */

/**
 * @typedef {(
 *  | RoomEditModal
 * )} Modal
 */

/**
 * @typedef {{
 *   readonly activeStage: {
 *     readonly vent: number
 *     readonly step1: number
 *     readonly step2: number
 *   }
 *   readonly comfort: ComfortType
 *   readonly outletsCount: string
 *   readonly activeModal: Modal | null
 *   readonly silencerType: SilencerType
 *   readonly stages: ReadonlyArray<Stage>
 *   readonly wallToMachineDistance: string
 *   readonly productLine: ChosenProductLine
 *   readonly airExchangeType: AirExchangeType
 *   readonly distanceToSupplyCollector: string
 *   readonly distanceToExhaustCollector: string
 *   readonly filteredOutProducts: ReadonlySet<number>
 *   readonly products: ReadonlyMap<number, DBProductData>
 *   readonly productsCountOffsets: ReadonlyMap<number, number>
 * }} Model
 */

// MODULE View

/** @typedef {{ name: 'empty' }} EmptyError */

/** @typedef {{ name: 'not-a-number' }} NotANumberError */

/** @typedef {{ name: 'too-low', min: number }} TooLowError */

/** @typedef {{ name: 'too-high', max: number }} TooHighError */

/**
 * @typedef {(
 *  | EmptyError
 * )} RoomNameError
 */

/**
 * @typedef {(
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} RoomWallError
 */

/**
 * @typedef {(
 *  | EmptyError
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} RoomSquareError
 */

/**
 * @typedef {(
 *  | EmptyError
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} RoomPeopleCountError
 */

/**
 * @typedef {(
 *  | EmptyError
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} StageHeightError
 */

/**
 * @typedef {(
 *  | EmptyError
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} RoomAirTrafficError
 */

/**
 * @typedef {(
 *  | { name: 'no-rooms' }
 *  | { name: 'rooms-have-errors' }
 * )} StageStep1Error
 */

/**
 * @typedef {(
 *  | { name: 'rooms-have-errors' }
 * )} StageStep2Error
 */

/**
 * @typedef {(
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} DistanceToCollectorError
 */

/**
 * @typedef {(
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} WallToMachineDistanceError
 */

/**
 * @typedef {(
 *  | EmptyError
 *  | TooLowError
 *  | TooHighError
 *  | NotANumberError
 * )} OutletsCountError
 */

/** @typedef {'ok' | 'preferred-classic' | 'incorrect-task'} Step4Status */

/** @typedef {FinalProductData & { orderId: number, canMore: boolean, canLess: boolean }} FinalProductDataView */

/**
 * @typedef {{
 *   readonly step1: {
 *     readonly comfortType: ComfortType
 *     readonly rooms: ReadonlyArray<{
 *       readonly id: number
 *       readonly type: RoomType
 *       readonly orderId: string
 *       readonly stageId: number
 *       readonly name: StringField<RoomNameError>
 *       readonly width: StringField<RoomWallError>
 *       readonly length: StringField<RoomWallError>
 *       readonly square: StringField<RoomSquareError>
 *       readonly peopleCount: StringField<RoomPeopleCountError>
 *     }>
 *     readonly stages: ReadonlyArray<{
 *       readonly active: boolean
 *       readonly enabled: boolean
 *       readonly error: StageStep1Error | null
 *       readonly height: StringField<StageHeightError>
 *     }>
 *   }
 *   readonly step2: 'fix-prev' | {
 *     readonly stages: ReadonlyArray<{
 *       readonly height: string
 *       readonly active: boolean
 *       readonly enabled: boolean
 *       readonly supply: string | null
 *       readonly exhaust: string | null
 *       readonly error: StageStep2Error | null
 *     }>
 *     readonly rooms: ReadonlyArray<{
 *       readonly id: number
 *       readonly name: string
 *       readonly type: RoomType
 *       readonly square: string
 *       readonly volume: string
 *       readonly stageId: number
 *       readonly orderId: string
 *       readonly multiplicity: string | null
 *       readonly traffic: StringField<RoomAirTrafficError>
 *     }>
 *     readonly supply: string | null
 *     readonly exhaust: string | null
 *   }
 *   readonly step3: 'fix-prev' | (
 *   & {
 *     readonly rooms: ReadonlyArray<{
 *       readonly id: number
 *       readonly name: string
 *       readonly type: RoomType
 *       readonly square: string
 *       readonly volume: string
 *       readonly stageId: number
 *       readonly orderId: string
 *       readonly airDuctPipesCount: string
 *       readonly multiplicity: string | null
 *     }>
 *     readonly supply: string
 *     readonly exhaust: string
 *     readonly silencerType: SilencerType
 *     readonly airExchangeType: AirExchangeType
 *     readonly stages: ReadonlyArray<{
 *       readonly height: string
 *       readonly active: boolean
 *       readonly enabled: boolean
 *     }>
 *     readonly productLine: ChosenProductLine
 *     readonly outletsCount: StringField<OutletsCountError>
 *     readonly distanceToSupplyCollector: StringField<DistanceToCollectorError>
 *     readonly distanceToExhaustCollector: StringField<DistanceToCollectorError>
 *   }
 *   & (
 *   | {
 *     readonly airExchangeType: 'wall'
 *     readonly wallToMachineDistance: StringField<WallToMachineDistanceError>
 *   }
 *   | {
 *     readonly airExchangeType: 'roof'
 *   }
 *   )
 *   )
 *   readonly step4: 'fix-prev'
 *   | {
 *     status: 'ok'
 *     total: number
 *     products: ReadonlyArray<FinalProductDataView>
 *   }
 *   | {
 *     status: 'preferred-classic'
 *     total: number
 *     products: ReadonlyArray<FinalProductDataView>
 *   }
 *   | {
 *     status: 'incorrect-task'
 *   }
 *   readonly modal: null | {
 *     readonly name: 'room-edit'
 *     readonly room: number
 *     readonly stage: number
 *     readonly width: StringField<RoomWallError>
 *     readonly length: StringField<RoomWallError>
 *     readonly roomName: StringField<RoomNameError>
 *     readonly square: StringField<RoomSquareError>
 *   }
 * }} View
 */

// MODULE Update

/**
 * @typedef {{
 *   readonly type: ComfortType
 *   readonly name: 'setComfortType'
 * }} SetComfortType
 */

/**
 * @typedef {{
 *   readonly stage: number
 *   readonly status: boolean
 *   readonly name: 'setStageStatus'
 * }} SetStageStatus
 */

/**
 * @typedef {{
 *   readonly stage: number
 *   readonly value: string
 *   readonly name: 'setStageHeight'
 * }} SetStageHeight
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly value: string
 *   readonly name: 'setRoomSquare'
 * }} SetRoomSquare
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly value: string
 *   readonly name: 'setRoomWidth'
 * }} SetRoomWidth
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly value: string
 *   readonly name: 'setRoomLength'
 * }} SetRoomLength
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly value: string
 *   readonly name: 'setRoomName'
 * }} SetRoomName
 */

/**
 * @typedef {(
 *  & {
 *     readonly stage: number
 *     readonly type: RoomType
 *     readonly name: 'addRoom'
 *     readonly roomName: string
 *     readonly minAirTraffic?: number
 *  }
 *  & (
 *    | {
 *        readonly type: 'supply'
 *        readonly supplyRoomType: SupplyRoomType
 *     }
 *    | {
 *      readonly type: 'exhaust'
 *    }
 *  )
 * )} AddRoom
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly name: 'removeRoom'
 * }} RemoveRoom
 */

/**
 * @typedef {{
 *   readonly stage: number
 *   readonly name: 'setActiveStage'
 *   readonly step: 'step1' | 'step2' | 'vent'
 * }} SetActiveStage
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly value: string
 *   readonly name: 'setRoomPeopleCount'
 * }} SetRoomPeopleCount
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly value: string
 *   readonly name: 'setRoomAirTraffic'
 * }} SetRoomAirTraffic
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setRoomEditModalName'
 * }} SetRoomEditModalName
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setRoomEditModalLength'
 * }} SetRoomEditModalLength
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setRoomEditModalWidth'
 * }} SetRoomEditModalWidth
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setRoomEditModalSquare'
 * }} SetRoomEditModalSquare
 */

/**
 * @typedef {{
 *   readonly room: number
 *   readonly stage: number
 *   readonly name: 'openRoomEditModal'
 * }} OpenRoomEditModal
 */

/**
 * @typedef {{
 *   readonly name: 'saveRoomEditModal'
 * }} SaveRoomEditModal
 */

/**
 * @typedef {{
 *   readonly name: 'closeRoomEditModal'
 * }} CloseRoomEditModal
 */

/**
 * @typedef {{
 *   readonly type: SilencerType
 *   readonly name: 'setSilencerType'
 * }} SetSilencerType
 */

/**
 * @typedef {{
 *   readonly type: AirExchangeType
 *   readonly name: 'setAirExchangeType'
 * }} SetAirExchangeType
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setSupplyCollectorDistance'
 * }} SetSupplyCollectorDistance
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setExhaustCollectorDistance'
 * }} SetExhaustCollectorDistance
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setVentToWallDistance'
 * }} SetVentToWallDistance
 */

/**
 * @typedef {{
 *   readonly value: string
 *   readonly name: 'setOutletsCount'
 * }} SetOutletsCount
 */

/**
 * @typedef {{
 *   readonly name: 'setProductLine'
 *   readonly productLine: ChosenProductLine
 * }} SetProductLine
 */

/**
 * @typedef {{
 *   readonly productId: number
 *   readonly name: 'incrementProductCountOffset'
 * }} IncrementProductCountOffset
 */

/**
 * @typedef {{
 *   readonly productId: number
 *   readonly name: 'decrementProductCountOffset'
 * }} DecrementProductCountOffset
 */

/**
 * @typedef {{
 *   readonly productId: number
 *   readonly name: 'filterOutProduct'
 * }} FilterOutProduct
 */

/**
 * @typedef {{
 *   readonly name: 'showDefaultProducts'
 * }} ShowDefaultProducts
 */

/**
 * @typedef {(
 *  | AddRoom
 *  | RemoveRoom
 *  | SetRoomName
 *  | SetRoomWidth
 *  | SetRoomLength
 *  | SetRoomSquare
 *  | SetActiveStage
 *  | SetComfortType
 *  | SetStageHeight
 *  | SetStageStatus
 *  | SetProductLine
 *  | SetOutletsCount
 *  | SetSilencerType
 *  | FilterOutProduct
 *  | SetRoomAirTraffic
 *  | OpenRoomEditModal
 *  | SaveRoomEditModal
 *  | CloseRoomEditModal
 *  | SetRoomPeopleCount
 *  | SetAirExchangeType
 *  | ShowDefaultProducts
 *  | SetRoomEditModalName
 *  | SetVentToWallDistance
 *  | SetRoomEditModalWidth
 *  | SetRoomEditModalLength
 *  | SetRoomEditModalSquare
 *  | SetSupplyCollectorDistance
 *  | SetExhaustCollectorDistance
 *  | IncrementProductCountOffset
 *  | DecrementProductCountOffset
 * )} Command
 */

/** @template {Command['name']} K @typedef {(cmd: Command & { name: K }, model: Model) => Model} CommandHandler */

// SECTION Library

const some = false;

const every = true;

/** @type {(_: never) => never} */
const absurd = (_) => {
  throw new Error("Absurd function called");
};

/** @type {(string: string) => boolean} */
const isNumericString = (string) => /^\d+$/.test(string);

/** @type {<O extends Record<string, unknown>, K extends keyof O>(obj: O, prop: K, func: (param: O[K]) => O[K]) => O} */
const lens = (obj, prop, func) => ({ ...obj, [prop]: func(obj[prop]) });

/** @type {<O extends Record<string, unknown>, K extends keyof O>(prop: K, func: (param: O[K]) => O[K]) => (obj: O) => O} */
const lensC = (prop, func) => (obj) => ({ ...obj, [prop]: func(obj[prop]) });

/** @type {<T>(value: T) => () => T} */
const upd = (value) => () => value;

/** @type {<T>(array: ReadonlyArray<T>, func: (elem: T, index: number) => T) => Array<T>} */
const traverse = (array, func) => array.map(func);

/** @type {<T>(func: (elem: T, index: number) => T) => (array: ReadonlyArray<T>) => Array<T>} */
const traverseC = (func) => (array) => traverse(array, func);

/** @type {<T>(index: number, func: (elem: T) => T) => (elem: T, index: number) => T} */
const withIndex = (index, func) => (elem, i) =>
  i === index ? func(elem) : elem;

/** @type {<T>(array: ReadonlyArray<T>, elem: T) => Array<T>} */
const push = (array, elem) => [...array, elem];

/** @type {<T>(elem: T) => (array: ReadonlyArray<T>) => Array<T>} */
const pushC = (elem) => (array) => push(array, elem);

/** @type {<T>(array: ReadonlyArray<T>, index: number) => Array<T>} */
const remove = (array, index) =>
  index < 0
    ? [...array]
    : [...array.slice(0, index), ...array.slice(index + 1)];

/** @type {(index: number) => <T>(array: ReadonlyArray<T>) => Array<T>} */
const removeC = (index) => (array) => remove(array, index);

/** @type {<O extends Record<string, unknown>>(obj: O, pred: () => boolean, func: (param: O) => O) => O} */
const pre = (obj, pred, func) => (pred() ? func(obj) : obj);

/** @type {<O extends Record<string, unknown>>(pred: () => boolean, func: (param: O) => O) => (obj: O) => O} */
const preC = (pred, func) => (obj) => pre(obj, pred, func);

// SECTION Constants

/** @type {number} */
const defaultStageHeight = 300;

/** @type {ComfortType} */
const defaultComfortType = "standard";

/** @type {number} */
const minStageHeight = 150;

/** @type {number} */
const maxStageHeight = 700;

/** @type {number} */
const minRoomWall = 100;

/** @type {number} */
const maxRoomWall = 1000;

/** @type {number} */
const minRoomPeopleCount = 1;

/** @type {number} */
const maxRoomPeopleCount = 10;

/** @type {number} */
const minRoomAirTraffic = 10;

/** @type {number} */
const maxRoomAirTraffic = 300;

/** @type {number} */
const minRoomSquare = minRoomWall ** 2 / 10000;

/** @type {number} */
const maxRoomSquare = maxRoomWall ** 2 / 10000;

/** @type {number} */
const minDistanceToCollector = 0;

/** @type {number} */
const maxDistanceToCollector = 100;

/** @type {number} */
const minWallToMachineDistance = 0;

/** @type {number} */
const maxWallToMachineDistance = 100;

/** @type {number} */
const minOutletsCount = 0;

/** @type {number} */
const maxOutletsCount = 300;

/** @type {number} */
const airDuctPipeLength = 15;

/** @type {number} */
const airDuctPipeBandwidth = 30;

/** @type {number} */
const distanceBetweenStages = 30;

/** @type {readonly ['supply', 'exhaust']} */
const roomTypes = ["supply", "exhaust"];

/** @type {(comfort: ComfortType) => 30 | 45} */
const getHumanAirConsume = (comfort) => (comfort === "standard" ? 30 : 45);

/** @type {(line: ProductLine) => 50 | 2} */
const getAirDuctProductLength = (line) => (line === "classic" ? 50 : 2);

const testProducts = [
  {
    id: 12,
    price: 790,
    image: "/assets/images/products/12/frame fix1.png",
    name: "Р¤РёРєСЃР°С‚РѕСЂ РґР»СЏ РіРёР±РєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° DN 75, (1 РєРѕРјРїР»РµРєС‚ = 10 С€С‚.) ",
  },
  {
    id: 13,
    price: 2890,
    image: "/assets/images/products/13/frame con 1.png",
    name: "РђРґР°РїС‚РµСЂ РґРёС„С„СѓР·РѕСЂР° D125 c РїРѕРґРєР»СЋС‡РµРЅРёРµРј РґРІСѓС… РІРѕР·РґСѓС…РѕРІРѕРґРѕРІ DN 75, L 235РјРј ",
  },
  {
    id: 29,
    price: 790,
    image: "/assets/images/products/29/frame-533-(5).png",
    name: "РљРѕР»СЊС†Рѕ СѓРїР»РѕС‚РЅРёС‚РµР»СЊРЅРѕРµ DN 75, (1 РєРѕРјРїР»РµРєС‚ = 10 С€С‚.) ",
  },
  {
    id: 26,
    price: 26950,
    image: "/assets/images/products/26/frame gib 1 png.png",
    name: "Р’РѕР·РґСѓС…РѕРІРѕРґ РіРёР±РєРёР№ DN 75/63 Р°РЅС‚РёР±Р°РєС‚РµСЂРёР°Р»СЊРЅС‹Р№/Р°РЅС‚РёСЃС‚Р°С‚РёС‡РµСЃРєРёР№ 50Рј ",
  },
  {
    id: 33,
    price: 90,
    image: "/assets/images/products/33/33-11.png",
    name: "Р—Р°РіР»СѓС€РєР° РґР»СЏ РіРёР±РєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° DN 75 ",
  },
  {
    id: 34,
    price: 13950,
    image: "/assets/images/products/34/frame-534-(2).png",
    name: "Р Р°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅС‹Р№ РєРѕР»Р»РµРєС‚РѕСЂ С€СѓРјРѕРёР·РѕР»РёСЂРѕРІР°РЅРЅС‹Р№ DN 160, РЅР° 8 РІС‹С…РѕРґРѕРІ DN 75. ",
  },
  {
    id: 35,
    price: 15950,
    image: "/assets/images/products/35/frame-534-(3).png",
    name: "Р Р°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅС‹Р№ РєРѕР»Р»РµРєС‚РѕСЂ С€СѓРјРѕРёР·РѕР»РёСЂРѕРІР°РЅРЅС‹Р№ DN 160, РЅР° 16 РІС‹С…РѕРґРѕРІ DN 75. ",
  },
  {
    id: 36,
    price: 17950,
    image: "/assets/images/products/36/frame-534-(4).png",
    name: "Р Р°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅС‹Р№ РєРѕР»Р»РµРєС‚РѕСЂ С€СѓРјРѕРёР·РѕР»РёСЂРѕРІР°РЅРЅС‹Р№ DN 200, РЅР° 24 РІС‹С…РѕРґРѕРІ DN 75 ",
  },
  {
    id: 37,
    price: 155,
    image: "/assets/images/products/37/37-11.png",
    name: "Р—Р°РіР»СѓС€РєР° РґР»СЏ РєРѕР»Р»РµРєС‚РѕСЂР° DN 75 ",
  },
  {
    id: 38,
    price: 845,
    image: "/assets/images/products/38/frame-534-(5).png",
    name: "РќРѕР¶ РґР»СЏ РіРёР±РєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° DN 75 ",
  },
  {
    id: 39,
    price: 590,
    image: "/assets/images/products/39/frame-533.png",
    name: "Р’РѕР·РґСѓС…РѕРІРѕРґ РїР»РѕСЃРєРёР№ 132/30 Р°РЅС‚РёР±Р°РєС‚РµСЂРёР°Р»СЊРЅС‹Р№/Р°РЅС‚РёСЃС‚Р°С‚РёС‡РµСЃРєРёР№ 2Рј ",
  },
  {
    id: 40,
    price: 14000,
    image: "/assets/images/products/40/frame-535.png",
    name: "Р Р°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅР°СЏ РєРѕСЂРѕР±РєР° DN 160, РЅР° 12 РІС‹С…РѕРґРѕРІ 132/30. Р Р°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅР°СЏ РєРѕСЂРѕР±РєР° DN 160, РЅР° 12 РІС‹С…РѕРґРѕРІ 132/30. Р’ РєРѕРјРїР»РµРєС‚Рµ РєРѕРЅРЅРµРєС‚РѕСЂС‹ РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ РІРѕР·РґСѓС…РѕРІРѕРґРѕРІ СЃ СЂРµРіСѓР»СЏС‚РѕСЂР°РјРё РїРѕС‚РѕРєР° (12 С€С‚.) ",
  },
  {
    id: 41,
    price: 12000,
    image: "/assets/images/products/41/frame-5352.png",
    name: "Р Р°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅР°СЏ РєРѕСЂРѕР±РєР° DN 160, РЅР° 10 РІС‹С…РѕРґРѕРІ 132/30. ",
  },
  {
    id: 42,
    price: 10000,
    image: "/assets/images/products/42/frame-535-5.png",
    name: "Р Р°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅР°СЏ РєРѕСЂРѕР±РєР° DN 160, РЅР° 6 РІС‹С…РѕРґРѕРІ 132/30. ",
  },
  {
    id: 43,
    price: 3900,
    image: "/assets/images/products/43/frame-533-4.png",
    name: "РђРґР°РїС‚РµСЂ РІРЅСѓС‚СЂРёРїРѕР»СЊРЅС‹Р№ 700/80/120 РЅР° С‚СЂРё РІС…РѕРґР° 132/32 ",
  },
  {
    id: 44,
    price: 6900,
    image: "/assets/images/products/44/frame-533-3.png",
    name: "РџР°РЅРµР»СЊ РёР· РЅРµСЂР¶Р°РІРµСЋС‰РµР№ СЃС‚Р°Р»Рё 700/80 СЃ РѕРґРЅРёРј С‰РµР»РµРІС‹Рј РѕС‚РІРµСЂСЃС‚РёРµРј, С†РІРµС‚ СЃРµСЂРµР±СЂРѕ ",
  },
  {
    id: 46,
    price: 1950,
    image: "/assets/images/products/46/frame-533-5.png",
    name: "РђРґР°РїС‚РµСЂ РІРЅСѓС‚СЂРёРїРѕР»СЊРЅС‹Р№ 370/72/90 РЅР° РѕРґРёРЅ РІС…РѕРґ 132/32 ",
  },
  {
    id: 47,
    price: 2950,
    image: "/assets/images/products/47/frame-533-6.png",
    name: "РџР°РЅРµР»СЊ РёР· РЅРµСЂР¶Р°РІРµСЋС‰РµР№ СЃС‚Р°Р»Рё 400/90 СЃ РѕРґРЅРёРј С‰РµР»РµРІС‹Рј РѕС‚РІРµСЂСЃС‚РёРµРј, С†РІРµС‚ СЃРµСЂРµР±СЂРѕ ",
  },
  {
    id: 51,
    price: 190,
    image: "/assets/images/products/51/frame-533-9.png",
    name: "Р¤РёРєСЃР°С‚РѕСЂ РёР· РЅРµСЂР¶Р°РІРµСЋС‰РµР№ СЃС‚Р°Р»Рё РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° 132/30 ",
  },
  {
    id: 58,
    price: 560,
    image: "/assets/images/products/58/frame-533-16.png",
    name: "РљРѕРЅРЅРµРєС‚РѕСЂ РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ РІРѕР·РґСѓС…РѕРІРѕРґР° Рє РІРЅСѓС‚СЂРёРїРѕР»СЊРЅРѕРјСѓ Р°РґР°РїС‚РµСЂСѓ СЃ СЂРµРіСѓР»СЏС‚РѕСЂРѕРј РїРѕС‚РѕРєР° РІРѕР·РґСѓС…Р° 132/32 ",
  },
  {
    id: 59,
    price: 95,
    image: "/assets/images/products/59/frame-533-17.png",
    name: "Р—Р°РіР»СѓС€РєР° РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° 132/32 ",
  },
  {
    id: 60,
    price: 95,
    image: "/assets/images/products/60/frame-533-17.png",
    name: "Р—Р°РіР»СѓС€РєР° РґР»СЏ СЂР°СЃРїСЂРµРґРµР»РёС‚РµР»СЊРЅРѕР№ РєРѕСЂРѕР±РєРё 132/32 ",
  },
  {
    id: 62,
    price: 2700,
    image: "/assets/images/products/62/thd200.png",
    name: "Thermo Duct РІРѕР·РґСѓС…РѕРІРѕРґ DN 160 СЃ С„Р»Р°РЅС†РµРј, L 1000 РјРј ",
  },
  {
    id: 63,
    price: 3960,
    image: "/assets/images/products/62/thd200.png",
    name: "Thermo Duct РІРѕР·РґСѓС…РѕРІРѕРґ DN 200 СЃ С„Р»Р°РЅС†РµРј, L 1000 РјРј ",
  },
  {
    id: 65,
    price: 1000,
    image: "/assets/images/products/64/th90dgr.png",
    name: "Thermo Duct РѕС‚РІРѕРґ 90В° DN 160, FLIBEN. (РњРѕР¶РЅРѕ СЂР°Р·РґРµР»РёС‚СЊ РЅР° 2С…45В°) ",
  },
  {
    id: 66,
    price: 1570,
    image: "/assets/images/products/64/th90dgr.png",
    name: "Thermo Duct РѕС‚РІРѕРґ 90В° DN 200, FLIBEN. (РњРѕР¶РЅРѕ СЂР°Р·РґРµР»РёС‚СЊ РЅР° 2С…45В°) ",
  },
  {
    id: 68,
    price: 445,
    image: "/assets/images/products/67/thdmft.png",
    name: "РњСѓС„С‚Р° СЃРѕРµРґРёРЅРёС‚РµР»СЊРЅР°СЏ РґР»СЏ Thermo Duct РІРѕР·РґСѓС…РѕРІРѕРґР° DN 160 ",
  },
  {
    id: 69,
    price: 715,
    image: "/assets/images/products/67/thdmft.png",
    name: "РњСѓС„С‚Р° СЃРѕРµРґРёРЅРёС‚РµР»СЊРЅР°СЏ РґР»СЏ Thermo Duct РІРѕР·РґСѓС…РѕРІРѕРґР° DN 200 ",
  },
  {
    id: 73,
    price: 6885,
    image: "/assets/images/products/72/silencer200.png",
    name: "РЁСѓРјРѕРіР»СѓС€РёС‚РµР»СЊ Thermo Duct DN 160, L600 ",
  },
  {
    id: 74,
    price: 7905,
    image: "/assets/images/products/72/silencer200.png",
    name: "РЁСѓРјРѕРіР»СѓС€РёС‚РµР»СЊ Thermo Duct DN 200, L600 ",
  },
  {
    id: 79,
    price: 14280,
    image: "/assets/images/products/76/clncrflx200.png",
    name: "Р“РёР±РєРёР№ С€СѓРјРѕРіР»СѓС€РёС‚РµР»СЊ Thermo Duct DN 160, L1000 ",
  },
  {
    id: 80,
    price: 16630,
    image: "/assets/images/products/76/clncrflx200.png",
    name: "Р“РёР±РєРёР№ С€СѓРјРѕРіР»СѓС€РёС‚РµР»СЊ Thermo Duct DN 200, L1000 ",
  },
  {
    id: 82,
    price: 4855,
    image: "/assets/images/products/81/elclap200.png",
    name: "Thermo Duct РєР»Р°РїР°РЅ РїСЂРѕС‚РёРІРѕРїРѕР¶Р°СЂРЅС‹Р№ DN 160 ",
  },
  {
    id: 83,
    price: 5710,
    image: "/assets/images/products/81/elclap200.png",
    name: "Thermo Duct РєР»Р°РїР°РЅ РїСЂРѕС‚РёРІРѕРїРѕР¶Р°СЂРЅС‹Р№ DN 200 ",
  },
  {
    id: 85,
    price: 315,
    image: "/assets/images/products/84/hom200.png",
    name: "РҐРѕРјСѓС‚ РјРѕРЅС‚Р°Р¶РЅС‹Р№ РґР»СЏ Thermo Duct РІРѕР·РґСѓС…РѕРІРѕРґР° DN 160 ",
  },
  {
    id: 86,
    price: 370,
    image: "/assets/images/products/84/hom200.png",
    name: "РҐРѕРјСѓС‚ РјРѕРЅС‚Р°Р¶РЅС‹Р№ РґР»СЏ Thermo Duct РІРѕР·РґСѓС…РѕРІРѕРґР° DN 200 ",
  },
  {
    id: 52,
    price: 290,
    image: "/assets/images/products/52/frame-533-10.png",
    name: "РћС‚РІРѕРґ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅС‹Р№ 90В° РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° 132/32 ",
  },
  {
    id: 53,
    price: 290,
    image: "/assets/images/products/53/frame-533-11.png",
    name: "РћС‚РІРѕРґ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅС‹Р№ 45В° РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° 132/32 ",
  },
  {
    id: 54,
    price: 290,
    image: "/assets/images/products/54/frame-533-12.png",
    name: "РћС‚РІРѕРґ РІРµСЂС‚РёРєР°Р»СЊРЅС‹Р№ 90В° РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° 132/32 ",
  },
  {
    id: 55,
    price: 290,
    image: "/assets/images/products/55/frame-533-13.png",
    name: "РћС‚РІРѕРґ РІРµСЂС‚РёРєР°Р»СЊРЅС‹Р№ 45В° РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° 132/32 ",
  },
  {
    id: 56,
    price: 190,
    image: "/assets/images/products/56/frame-533-14.png",
    name: "РњСѓС„С‚Р° СЃРѕРµРґРёРЅРёС‚РµР»СЊРЅР°СЏ РґР»СЏ РїР»РѕСЃРєРѕРіРѕ РІРѕР·РґСѓС…РѕРІРѕРґР° 132/32 ",
  },
  {
    id: 102,
    price: 290,
    image: "/assets/images/products/102/confloor.png",
    name: "РљРѕРЅРЅРµРєС‚РѕСЂ РґР»СЏ РІРЅСѓС‚СЂРёРїРѕР»СЊРЅРѕРіРѕ Р°РґР°РїС‚РµСЂР° 700/80/120 ",
  },
  {
    id: 97,
    price: 1600,
    image: "/assets/images/products/97/filterbox1.png",
    name: "Р¤РёР»СЊС‚СЂ-Р±РѕРєСЃ Thermo Duct DN 160 ",
  },
  {
    id: 98,
    price: 2000,
    image: "/assets/images/products/98/filterbox1.png",
    name: "Р¤РёР»СЊС‚СЂ-Р±РѕРєСЃ Thermo Duct DN 200 ",
  },
];

// SECTION Errors

/** @type {() => null} */
const end = () => null;

/** @type {<T, R>(next: (value: T) => R | null) => (value: T | null) => R | null} */
const nullable = (next) => (value) => (value === null ? null : next(value));

/** @type {<R>(next: (value: string) => R | null) => (value: string) => EmptyError | R | null} */
const nonEmpty = (next) => (value) =>
  value === "" ? /** @type {const} */ ({ name: "empty" }) : next(value);

/** @type {<R>(next: (value: string) => R | null) => (value: string) => R | null} */
const probablyEmpty = (next) => (value) => (value === "" ? null : next(value));

/** @type {<R>(next: (value: number) => R | null) => (value: string) => NotANumberError | R | null} */
const numberCompatibleString = (next) => (value) => {
  if (!isNumericString(value)) {
    return /*** @type {const} */ ({ name: "not-a-number" });
  }

  const numValue = Number.parseInt(value, 10);

  if (Number.isNaN(numValue)) {
    return /*** @type {const} */ ({ name: "not-a-number" });
  }

  return next(numValue);
};

/** @type {<R>(min: number, next: (value: number) => R | null) => (value: number) => TooLowError | R | null} */
const withMin = (min, next) => (value) =>
  value < min ? /** @type {const} */ ({ name: "too-low", min }) : next(value);

/** @type {<R>(min: number, next: (value: number) => R | null) => (value: number) => TooHighError | R | null} */
const withMax = (max, next) => (value) =>
  value > max ? /** @type {const} */ ({ name: "too-high", max }) : next(value);

// SECTION Domain

/** @type {(room: Room) => room is Room & { peopleCount: string }} */
// @ts-ignore necessary
const roomHasPeopleCount = (room) =>
  true &&
  room.type === "supply" &&
  (some ||
    room.supplyRoomType === "living-room" ||
    room.supplyRoomType === "business-room");

/** @type {(airDuctLength: number, line: ProductLine) => number} */
const getAirDuctProductCount = (airDuctLength, line) =>
  Math.ceil(airDuctLength / getAirDuctProductLength(line));

/** @type {(airDuctLength: number) => number} */
const getMountingClipCount = (airDuctLength) => Math.ceil(airDuctLength);

/** @type {(roomPipeCount: number) => number} */
const getAirDuctPlugCount = (roomPipeCount) => roomPipeCount * 2;

/** @type {(pipeCount: number) => ClassicCollectorHoles} */
const getClassicCollectorSize = (pipeCount) => {
  switch (true) {
    case pipeCount <= 8:
      return 8;
    case pipeCount <= 16:
      return 16;
    default:
      return 24;
  }
};

/** @type {(pipeCount: number) => SlimCollectorHoles} */
const getSlimCollectorSize = (pipeCount) => {
  switch (true) {
    case pipeCount < 6:
      return 6;
    case pipeCount < 10:
      return 10;
    default:
      return 12;
  }
};

/** @type {(model: Model) => (id: number, count: number) => FinalProductData} */
const getFinalProduct = (model) => (id, count) => {
  /** @type {DBProductData} */
  // @ts-ignore necessary
  const data = model.products.get(id);

  return { ...data, count };
};

/** @type {(model: Model, products: Products) => Array<FinalProductData>} */
const getProducts = (model, products) => {
  const getProduct = getFinalProduct(model);

  /** @type {Array<FinalProductData>} */
  const result = [];

  if (products.air_duct.classic !== 0) {
    result.push(getProduct(26, products.air_duct.classic));
  }
  if (products.air_duct.slim !== 0) {
    result.push(getProduct(39, products.air_duct.slim));
    result.push(getProduct(56, products.air_duct.slim));
  }
  if (products.mounting_clip.classic !== 0) {
    result.push(getProduct(12, products.mounting_clip.classic));
  }
  if (products.mounting_clip.slim !== 0) {
    result.push(getProduct(51, products.mounting_clip.slim));
  }
  if (products.seal_ring !== 0) {
    result.push(getProduct(29, products.seal_ring));
  }
  if (products.connector_classic !== 0) {
    result.push(getProduct(13, products.connector_classic));
  }
  if (products.connector_slim_1 !== 0) {
    result.push(getProduct(46, products.connector_slim_1));
  }
  if (products.connector_slim_3 !== 0) {
    result.push(getProduct(43, products.connector_slim_3));
    result.push(getProduct(102, products.connector_slim_3 * 2));
  }
  if (products.air_duct_plug.classic !== 0) {
    result.push(getProduct(33, products.air_duct_plug.classic));
  }
  if (products.air_duct_plug.slim !== 0) {
    result.push(getProduct(59, products.air_duct_plug.slim));
  }
  if (products.vent_knife !== 0) {
    result.push(getProduct(38, products.vent_knife));
  }
  if (products.connector_volume_regulation_valve !== 0) {
    result.push(getProduct(58, products.connector_volume_regulation_valve));
  }
  if (
    products.collector.classic !== 0 &&
    products.collector.classic.holes === 8
  ) {
    result.push(getProduct(34, products.collector.classic.count));
  }
  if (
    products.collector.classic !== 0 &&
    products.collector.classic.holes === 16
  ) {
    result.push(getProduct(35, products.collector.classic.count));
  }
  if (
    products.collector.classic !== 0 &&
    products.collector.classic.holes === 24
  ) {
    result.push(getProduct(36, products.collector.classic.count));
  }
  if (products.collector.slim !== 0 && products.collector.slim.holes === 6) {
    result.push(getProduct(42, products.collector.slim.count));
  }
  if (products.collector.slim !== 0 && products.collector.slim.holes === 10) {
    result.push(getProduct(41, products.collector.slim.count));
  }
  if (products.collector.slim !== 0 && products.collector.slim.holes === 12) {
    result.push(getProduct(40, products.collector.slim.count));
  }
  if (products.collector_plug.classic !== 0) {
    result.push(getProduct(37, products.collector_plug.classic));
  }
  if (products.collector_plug.slim !== 0) {
    result.push(getProduct(60, products.collector_plug.slim));
  }
  if (products.silencer.diameter === 160 && products.silencer.count !== 0) {
    result.push(
      getProduct(
        model.silencerType === "standard" ? 73 : 79,
        products.silencer.count,
      ),
    );
  }
  if (products.silencer.diameter === 200 && products.silencer.count !== 0) {
    result.push(
      getProduct(
        model.silencerType === "standard" ? 74 : 80,
        products.silencer.count,
      ),
    );
  }
  if (products.iso_pipe.diameter === 160 && products.iso_pipe.count !== 0) {
    result.push(getProduct(62, products.iso_pipe.count));
  }
  if (products.iso_pipe.diameter === 200 && products.iso_pipe.count !== 0) {
    result.push(getProduct(63, products.iso_pipe.count));
  }
  if (products.iso_pipe_coupling.diameter === 160) {
    result.push(getProduct(68, products.iso_pipe_coupling.count));
  }
  if (products.iso_pipe_coupling.diameter === 200) {
    result.push(getProduct(69, products.iso_pipe_coupling.count));
  }
  if (
    products.iso_pipe_clamp.diameter === 160 &&
    products.iso_pipe_clamp.count !== 0
  ) {
    result.push(getProduct(85, products.iso_pipe_clamp.count));
  }
  if (
    products.iso_pipe_clamp.diameter === 200 &&
    products.iso_pipe_clamp.count !== 0
  ) {
    result.push(getProduct(86, products.iso_pipe_clamp.count));
  }
  if (products.iso_pipe.diameter === 160) {
    result.push(getProduct(97, 1));
  }
  if (products.iso_pipe.diameter === 200) {
    result.push(getProduct(98, 1));
  }
  if (
    products.electric_valve.diameter === 160 &&
    products.electric_valve.count !== 0
  ) {
    result.push(getProduct(82, products.electric_valve.count));
  }
  if (
    products.electric_valve.diameter === 200 &&
    products.electric_valve.count !== 0
  ) {
    result.push(getProduct(83, products.electric_valve.count));
  }
  if (products.panel_1 !== 0) {
    result.push(getProduct(47, products.panel_1));
  }
  if (products.panel_3 !== 0) {
    result.push(getProduct(44, products.panel_3));
  }
  if (products.outlet.diameter === 160 && products.outlet.count !== 0) {
    result.push(getProduct(65, products.outlet.count));
  }
  if (products.outlet.diameter === 200 && products.outlet.count !== 0) {
    result.push(getProduct(66, products.outlet.count));
  }
  if (model.productLine === "combined") {
    result.push(getProduct(52, 0));
    result.push(getProduct(53, 0));
    result.push(getProduct(54, 0));
    result.push(getProduct(55, 0));
  }

  return result;
};

/** @type {(model: Model) => Model} */
const resetProductChooses = (model) => {
  const model1 = lens(model, "filteredOutProducts", upd(new Set()));
  const model2 = lens(model1, "productsCountOffsets", upd(new Map()));

  return model2;
};

// SECTION Exports

// MODULE Init

/** @type {(products: ReadonlyArray<DBProductData>) => Model} */
const init = (products) => ({
  products: new Map(products.map((p) => [p.id, p])),
  productsCountOffsets: new Map(),
  distanceToExhaustCollector: "",
  filteredOutProducts: new Set(),
  distanceToSupplyCollector: "",
  comfort: defaultComfortType,
  wallToMachineDistance: "",
  silencerType: "standard",
  airExchangeType: "roof",
  productLine: "classic",
  activeModal: null,
  outletsCount: "",
  activeStage: {
    step1: 0,
    step2: 0,
    vent: 0,
  },
  stages: [
    {
      height: String(defaultStageHeight),
      enabled: true,
      rooms: [],
    },
    {
      height: String(defaultStageHeight),
      enabled: true,
      rooms: [],
    },
    {
      height: String(defaultStageHeight),
      enabled: false,
      rooms: [],
    },
  ],
});

// MODULE Update

/** @type {CommandHandler<'setComfortType'>} */
const setComfortType = (cmd, model) =>
  resetProductChooses(lens(model, "comfort", upd(cmd.type)));

/** @type {CommandHandler<'setStageHeight'>} */
const setStageHeight = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(withIndex(cmd.stage, lensC("height", upd(cmd.value)))),
    ),
  );

/** @type {CommandHandler<'setStageStatus'>} */
const setStageStatus = (cmd, model) => {
  const stage = model.stages[cmd.stage];

  if (stage === undefined) {
    return model;
  }

  if (getEnabledStages(model.stages).length === 1 && stage.enabled) {
    return model;
  }

  const newActive1 =
    model.activeStage.step1 === cmd.stage && cmd.status === false
      ? model.stages.findIndex((val, i) => i !== cmd.stage && val.enabled)
      : model.activeStage.step1;

  const newActive2 =
    model.activeStage.step2 === cmd.stage && cmd.status === false
      ? model.stages.findIndex((val, i) => i !== cmd.stage && val.enabled)
      : model.activeStage.step2;

  const newVent =
    model.activeStage.vent === cmd.stage && cmd.status === false
      ? model.stages.findIndex((val, i) => i !== cmd.stage && val.enabled)
      : model.activeStage.vent;

  return resetProductChooses({
    ...model,
    stages: traverse(
      model.stages,
      withIndex(cmd.stage, lensC("enabled", upd(cmd.status))),
    ),
    activeStage: {
      step1: newActive1,
      step2: newActive2,
      vent: newVent,
    },
  });
};

/** @type {(cmd: AddRoom) => Room} */
const getNewRoom = (cmd) => {
  const base = {
    minAirTraffic: cmd.minAirTraffic,
    length: /** @type {''} */ (""),
    square: /** @type {''} */ (""),
    width: /** @type {''} */ (""),
    name: cmd.roomName,
    airTraffic: null,
  };

  if (cmd.type === "exhaust") {
    return {
      type: cmd.type,
      ...base,
    };
  }

  if (
    some ||
    cmd.supplyRoomType === "living-room" ||
    cmd.supplyRoomType === "business-room"
  ) {
    return {
      supplyRoomType: cmd.supplyRoomType,
      peopleCount: "",
      type: cmd.type,
      ...base,
    };
  }

  return {
    supplyRoomType: cmd.supplyRoomType,
    type: cmd.type,
    ...base,
  };
};

/** @type {CommandHandler<'addRoom'>} */
const addRoom = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(withIndex(cmd.stage, lensC("rooms", pushC(getNewRoom(cmd))))),
    ),
  );

/** @type {CommandHandler<'removeRoom'>} */
const removeRoom = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(withIndex(cmd.stage, lensC("rooms", removeC(cmd.room)))),
    ),
  );

/** @type {(width: string) => (room: Room) => Room} */
const getRoomWithWidth = (width) => (room) => ({
  ...room,
  width,
  square: "",
});

/** @type {CommandHandler<'setRoomWidth'>} */
const setRoomWidth = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(
        withIndex(
          cmd.stage,
          lensC(
            "rooms",
            traverseC(withIndex(cmd.room, getRoomWithWidth(cmd.value))),
          ),
        ),
      ),
    ),
  );

/** @type {(length: string) => (room: Room) => Room} */
const getRoomWithLength = (length) => (room) => ({
  ...room,
  length,
  square: "",
});

/** @type {CommandHandler<'setRoomLength'>} */
const setRoomLength = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(
        withIndex(cmd.stage, (stage) =>
          lens(
            stage,
            "rooms",
            traverseC(withIndex(cmd.room, getRoomWithLength(cmd.value))),
          ),
        ),
      ),
    ),
  );

/** @type {(square: string) => (room: Room) => Room} */
const getRoomWithSquare = (square) => (room) => ({
  ...room,
  square,
  length: "",
  width: "",
});

/** @type {CommandHandler<'setRoomSquare'>} */
const setRoomSquare = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(
        withIndex(
          cmd.stage,
          lensC(
            "rooms",
            traverseC(withIndex(cmd.room, getRoomWithSquare(cmd.value))),
          ),
        ),
      ),
    ),
  );

/** @type {(CommandHandler<'setActiveStage'>)} */
const setActiveStage = (cmd, model) =>
  resetProductChooses(
    pre(
      model,
      () => cmd.stage >= 0,
      preC(
        () => cmd.stage < model.stages.length,
        preC(
          () => model.stages[cmd.stage].enabled,
          lensC("activeStage", lensC(cmd.step, upd(cmd.stage))),
        ),
      ),
    ),
  );

/** @type {CommandHandler<'setRoomName'>} */
const setRoomName = (cmd, model) =>
  lens(
    model,
    "stages",
    traverseC(
      withIndex(
        cmd.stage,
        lensC(
          "rooms",
          traverseC(withIndex(cmd.room, lensC("name", upd(cmd.value)))),
        ),
      ),
    ),
  );

/** @type {(cmd: SetRoomPeopleCount) => (room: Room) => Room} */
const getRoomWithHumanCount = (cmd) => (room) =>
  roomHasPeopleCount(room) ? lens(room, "peopleCount", upd(cmd.value)) : room;

/** @type {CommandHandler<'setRoomPeopleCount'>} */
const setRoomPeopleCount = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(
        withIndex(
          cmd.stage,
          lensC(
            "rooms",
            traverseC(withIndex(cmd.room, getRoomWithHumanCount(cmd))),
          ),
        ),
      ),
    ),
  );

/** @type {CommandHandler<'setRoomAirTraffic'>} */
const setRoomAirTraffic = (cmd, model) =>
  resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(
        withIndex(
          cmd.stage,
          lensC(
            "rooms",
            traverseC(withIndex(cmd.room, lensC("airTraffic", upd(cmd.value)))),
          ),
        ),
      ),
    ),
  );

/** @type {CommandHandler<'saveRoomEditModal'>} */
const saveRoomEditModal = (_, model) => {
  const modal = model.activeModal;

  if (modal === null) {
    return model;
  }

  return resetProductChooses(
    lens(
      model,
      "stages",
      traverseC(
        withIndex(
          modal.stage,
          lensC(
            "rooms",
            traverseC(
              withIndex(
                modal.room,
                (room) =>
                  /** @type {Room} */ ({
                    ...room,
                    name: modal.roomName,
                    length: modal.length,
                    square: modal.square,
                    width: modal.width,
                  }),
              ),
            ),
          ),
        ),
      ),
    ),
  );
};

/** @type {CommandHandler<'openRoomEditModal'>} */
const openRoomEditModal = (cmd, model) => {
  const stage = model.stages[cmd.stage];

  if (stage === undefined) {
    return model;
  }

  const room = stage.rooms[cmd.room];

  if (room === undefined) {
    return model;
  }

  // For TypeScript compat
  if (room.square === "") {
    return lens(
      model,
      "activeModal",
      upd({
        name: /** @type {'room-edit'} */ ("room-edit"),
        square: /** @type {''} */ (""),
        roomName: room.name,
        length: room.length,
        width: room.width,
        stage: cmd.stage,
        room: cmd.room,
      }),
    );
  }

  return lens(
    model,
    "activeModal",
    upd({
      name: /** @type {'room-edit'} */ ("room-edit"),
      length: /** @type {''} */ (""),
      width: /** @type {''} */ (""),
      square: room.square,
      roomName: room.name,
      stage: cmd.stage,
      room: cmd.room,
    }),
  );
};

/** @type {CommandHandler<'closeRoomEditModal'>} */
const closeRoomEditModal = (_, model) => lens(model, "activeModal", upd(null));

/** @type {CommandHandler<'setRoomEditModalName'>} */
const setRoomEditModalName = (cmd, model) => {
  const modal = model.activeModal;

  if (some || modal === null || modal.name !== "room-edit") {
    return model;
  }

  return {
    ...model,
    activeModal: {
      ...modal,
      roomName: cmd.value,
    },
  };
};

/** @type {CommandHandler<'setRoomEditModalLength'>} */
const setRoomEditModalLength = (cmd, model) => {
  const modal = model.activeModal;

  if (some || modal === null || modal.name !== "room-edit") {
    return model;
  }

  return {
    ...model,
    activeModal: {
      ...modal,
      length: cmd.value,
      square: "",
    },
  };
};

/** @type {CommandHandler<'setRoomEditModalWidth'>} */
const setRoomEditModalWidth = (cmd, model) => {
  const modal = model.activeModal;

  if (some || modal === null || modal.name !== "room-edit") {
    return model;
  }

  return {
    ...model,
    activeModal: {
      ...modal,
      width: cmd.value,
      square: "",
    },
  };
};

/** @type {CommandHandler<'setRoomEditModalSquare'>} */
const setRoomEditModalSquare = (cmd, model) => {
  const modal = model.activeModal;

  if (some || modal === null || modal.name !== "room-edit") {
    return model;
  }

  return {
    ...model,
    activeModal: {
      ...modal,
      square: cmd.value,
      length: "",
      width: "",
    },
  };
};

/** @type {CommandHandler<'setSilencerType'>} */
const setSilencerType = (cmd, model) =>
  resetProductChooses(lens(model, "silencerType", upd(cmd.type)));

/** @type {CommandHandler<'setAirExchangeType'>} */
const setAirExchangeType = (cmd, model) =>
  resetProductChooses(lens(model, "airExchangeType", upd(cmd.type)));

/** @type {CommandHandler<'setProductLine'>} */
const setProductLine = (cmd, model) =>
  resetProductChooses(lens(model, "productLine", upd(cmd.productLine)));

/** @type {CommandHandler<'filterOutProduct'>} */
const filterOutProduct = (cmd, model) => {
  if (model.filteredOutProducts.has(cmd.productId)) {
    return model;
  }

  const newProducts = new Set(model.filteredOutProducts);

  newProducts.add(cmd.productId);

  return lens(model, "filteredOutProducts", upd(newProducts));
};

/** @type {CommandHandler<'setVentToWallDistance'>} */
const setVentToWallDistance = (cmd, model) =>
  resetProductChooses(lens(model, "wallToMachineDistance", upd(cmd.value)));

/** @type {CommandHandler<'setSupplyCollectorDistance'>} */
const setSupplyCollectorDistance = (cmd, model) =>
  resetProductChooses(lens(model, "distanceToSupplyCollector", upd(cmd.value)));

/** @type {CommandHandler<'setExhaustCollectorDistance'>} */
const setExhaustCollectorDistance = (cmd, model) =>
  resetProductChooses(
    lens(model, "distanceToExhaustCollector", upd(cmd.value)),
  );

/** @type {CommandHandler<'incrementProductCountOffset'>} */
const incrementProductCountOffset = (cmd, model) => {
  const offsets = new Map(model.productsCountOffsets);
  const offset = offsets.get(cmd.productId) || 0;

  offsets.set(cmd.productId, offset + 1);

  return lens(model, "productsCountOffsets", upd(offsets));
};

/** @type {CommandHandler<'decrementProductCountOffset'>} */
const decrementProductCountOffset = (cmd, model) => {
  const offsets = new Map(model.productsCountOffsets);
  const offset = offsets.get(cmd.productId) || 0;

  offsets.set(cmd.productId, offset - 1);

  return lens(model, "productsCountOffsets", upd(offsets));
};

/** @type {CommandHandler<'setOutletsCount'>} */
const setOutletsCount = (cmd, model) =>
  resetProductChooses(lens(model, "outletsCount", upd(cmd.value)));

/** @type {(CommandHandler<'showDefaultProducts'>)} */
const showDefaultProducts = (_, model) => resetProductChooses(model);

/** @type {(cmd: Command, model: Model) => Model} */
const update = (cmd, model) => {
  switch (cmd.name) {
    case "addRoom":
      return addRoom(cmd, model);
    case "removeRoom":
      return removeRoom(cmd, model);
    case "setRoomName":
      return setRoomName(cmd, model);
    case "setRoomWidth":
      return setRoomWidth(cmd, model);
    case "setRoomLength":
      return setRoomLength(cmd, model);
    case "setRoomSquare":
      return setRoomSquare(cmd, model);
    case "setActiveStage":
      return setActiveStage(cmd, model);
    case "setComfortType":
      return setComfortType(cmd, model);
    case "setStageHeight":
      return setStageHeight(cmd, model);
    case "setStageStatus":
      return setStageStatus(cmd, model);
    case "setProductLine":
      return setProductLine(cmd, model);
    case "setOutletsCount":
      return setOutletsCount(cmd, model);
    case "setSilencerType":
      return setSilencerType(cmd, model);
    case "filterOutProduct":
      return filterOutProduct(cmd, model);
    case "saveRoomEditModal":
      return saveRoomEditModal(cmd, model);
    case "setRoomAirTraffic":
      return setRoomAirTraffic(cmd, model);
    case "openRoomEditModal":
      return openRoomEditModal(cmd, model);
    case "closeRoomEditModal":
      return closeRoomEditModal(cmd, model);
    case "setRoomPeopleCount":
      return setRoomPeopleCount(cmd, model);
    case "setAirExchangeType":
      return setAirExchangeType(cmd, model);
    case "showDefaultProducts":
      return showDefaultProducts(cmd, model);
    case "setRoomEditModalName":
      return setRoomEditModalName(cmd, model);
    case "setRoomEditModalWidth":
      return setRoomEditModalWidth(cmd, model);
    case "setVentToWallDistance":
      return setVentToWallDistance(cmd, model);
    case "setRoomEditModalLength":
      return setRoomEditModalLength(cmd, model);
    case "setRoomEditModalSquare":
      return setRoomEditModalSquare(cmd, model);
    case "setSupplyCollectorDistance":
      return setSupplyCollectorDistance(cmd, model);
    case "setExhaustCollectorDistance":
      return setExhaustCollectorDistance(cmd, model);
    case "incrementProductCountOffset":
      return incrementProductCountOffset(cmd, model);
    case "decrementProductCountOffset":
      return decrementProductCountOffset(cmd, model);
    default:
      return absurd(cmd);
  }
};

// MODULE View

/** @type {(id: number) => string} */
const getRoomOrderId = (id) => String(id + 1);

/** @type {(value: string) => RoomNameError | null} */
const getRoomNameError = (value) => {
  if (value === "") {
    return { name: "empty" };
  }

  return null;
};

/** @type {(name: string) => ArrayElem<View['step1']['rooms']>['name']} */
const getRoomNameField = (name) => ({
  error: getRoomNameError(name),
  editable: true,
  value: name,
});

/** @type {(value: string) => RoomWallError | null} */
const getRoomWallError = probablyEmpty(
  numberCompatibleString(withMin(minRoomWall, withMax(maxRoomWall, end))),
);

/** @type {(name: string) => ArrayElem<View['step1']['rooms']>['width' | 'length']} */
const getRoomWallField = (wall) => ({
  error: getRoomWallError(wall),
  editable: true,
  value: wall,
});

/** @type {(room: Room) => string} */
const getRoomSquareStep1Value = (room) => {
  if (room.square !== "") {
    return room.square;
  }

  if (room.length === "" || room.width === "") {
    return "";
  }

  if (getRoomWallError(room.length) || getRoomWallError(room.width)) {
    return "";
  }

  return String(getRoomSquare(room));
};

/** @type {(value: string) => RoomSquareError | null} */
const getRoomSquareError = nonEmpty(
  numberCompatibleString(withMin(minRoomSquare, withMax(maxRoomSquare, end))),
);

/** @type {(room: Room) => ArrayElem<View['step1']['rooms']>['square']} */
const getRoomStep1SquareField = (room) => {
  const square = getRoomSquareStep1Value(room);

  return {
    error: getRoomSquareError(square),
    editable: true,
    value: square,
  };
};

/** @type {ArrayElem<View['step1']['rooms']>['peopleCount']} */
const peopleCountUneditable = {
  editable: false,
  error: null,
  value: "",
};

/** @type {(value: string) => RoomPeopleCountError | null} */
const getRoomPeopleCountError = nonEmpty(
  numberCompatibleString(
    withMin(minRoomPeopleCount, withMax(maxRoomPeopleCount, end)),
  ),
);

/** @type {(room: Room) => ArrayElem<View['step1']['rooms']>['peopleCount']} */
const getRoomPeopleCountField = (room) => {
  if (!roomHasPeopleCount(room)) {
    return peopleCountUneditable;
  }

  const value = room.peopleCount;

  return {
    error: getRoomPeopleCountError(value),
    editable: true,
    value,
  };
};

/** @type {(stageId: number, room: Room, id: number) => ArrayElem<View['step1']['rooms']>} */
const getStep1Room = (stageId, room, id) => ({
  peopleCount: getRoomPeopleCountField(room),
  length: getRoomWallField(room.length),
  square: getRoomStep1SquareField(room),
  width: getRoomWallField(room.width),
  name: getRoomNameField(room.name),
  orderId: getRoomOrderId(id),
  type: room.type,
  stageId,
  id,
});

/** @type {(room: ArrayElem<View['step1']['rooms']>) => boolean} */
const step1RoomHasError = (room) =>
  false ||
  room.peopleCount.error !== null ||
  room.square.error !== null ||
  room.length.error !== null ||
  room.width.error !== null ||
  room.name.error !== null;

/** @type {(stage: Stage, stageId: number) => StageStep1Error | null} */
const getStageStep1Error = (stage, stageId) => {
  if (!stage.enabled) {
    return null;
  }

  if (stage.rooms.length === 0) {
    return { name: "no-rooms" };
  }

  if (
    stage.rooms.some((room, id) =>
      step1RoomHasError(getStep1Room(stageId, room, id)),
    )
  ) {
    return { name: "rooms-have-errors" };
  }

  return null;
};

/** @type {(stage: Stage) => StageHeightError | null} */
const getStageHeightError = (stage) => {
  const value = stage.height;

  if (stage.enabled && value === "") {
    return { name: "empty" };
  }

  return numberCompatibleString(
    withMin(minStageHeight, withMax(maxStageHeight, end)),
  )(value);
};

/** @type {(stage: Stage) => ArrayElem<View['step1']['stages']>['height']} */
const getStageHeightField = (stage) => ({
  error: stage.enabled ? getStageHeightError(stage) : null,
  editable: stage.enabled,
  value: stage.height,
});

/** @type {(model: Model, stage: Stage, id: number) => ArrayElem<View['step1']['stages']>} */
const getStep1Stage = (model, stage, id) => ({
  active: id === model.activeStage.step1,
  error: getStageStep1Error(stage, id),
  height: getStageHeightField(stage),
  enabled: stage.enabled,
});

/** @type {(model: Model) => View['step1']} */
const getStep1 = (model) => {
  const activeStageId = model.activeStage.step1;

  return {
    rooms: model.stages[activeStageId].rooms.map((room, id) =>
      getStep1Room(model.activeStage.step1, room, id),
    ),
    stages: model.stages.map((stage, id) => getStep1Stage(model, stage, id)),
    comfortType: model.comfort,
  };
};

/** @type {(step1: View['step1']) => boolean} */
const step1HasErrors = (step1) =>
  step1.stages.some(
    (stage) =>
      true &&
      stage.enabled &&
      (some || stage.error !== null || stage.height.error),
  );

/** @type {(stages: ReadonlyArray<Stage>) => ReadonlyArray<Stage>} */
const getEnabledStages = (stages) => stages.filter((stage) => stage.enabled);

/** @type {(stages: ReadonlyArray<Stage>) => number} */
const getHousePeopleCount = (stages) => {
  let result = 0;

  for (const stage of stages) {
    for (const room of stage.rooms) {
      if (room.type === "supply" && room.supplyRoomType === "living-room") {
        result += Number.parseInt(room.peopleCount, 10);
      }
    }
  }

  return result;
};

/** @type {(room: Room) => number} */
const getRoomSquare = (room) =>
  room.length !== "" && room.width !== ""
    ? Math.round(
        (Number.parseInt(room.length, 10) * Number.parseInt(room.width, 10)) /
          10000,
      )
    : Number.parseInt(room.square);

/** @type {(stage: Stage, room: Room) => number} */
const getRoomVolume = (stage, room) => {
  const height = Number.parseInt(stage.height, 10);

  return Math.round((getRoomSquare(room) * height) / 100);
};

/** @type {(value: string | null) => RoomAirTrafficError | null} */
const getRoomAirTrafficError = nullable(
  nonEmpty(
    numberCompatibleString(
      withMin(minRoomAirTraffic, withMax(maxRoomAirTraffic, end)),
    ),
  ),
);

/** @type {(model: Model, stage: Stage, room: Room) =>  number | RoomAirTrafficError} */
const getRoomAirTraffic = (model, stage, room) => {
  const housePeopleCount = getHousePeopleCount(getEnabledStages(model.stages));
  const airTrafficError = getRoomAirTrafficError(room.airTraffic);
  const airConsume = getHumanAirConsume(model.comfort);

  if (airTrafficError !== null) {
    return airTrafficError;
  }

  if (room.airTraffic !== null) {
    return Number.parseInt(room.airTraffic, 10);
  }

  const minAirTraffic = room.minAirTraffic || 0;

  const volume = getRoomVolume(stage, room);

  const humanConsume = (() => {
    if (room.type === "supply") {
      if (room.supplyRoomType === "family-room") {
        return airConsume * housePeopleCount;
      }

      if (roomHasPeopleCount(room)) {
        return airConsume * Number.parseInt(room.peopleCount, 10);
      }
    }

    return 0;
  })();

  return Math.max(volume, humanConsume, minAirTraffic);
};

/** @type {(model: Model, stage: Stage) => Record<RoomType, number | null>} */
const getStageTraffics = (model, stage) => {
  /** @type {Record<RoomType, number | null>} */
  const stageTraffics = { exhaust: 0, supply: 0 };

  for (const room of stage.rooms) {
    if (stageTraffics[room.type] === null) {
      continue;
    }

    const roomTraffic = getRoomAirTraffic(model, stage, room);

    if (typeof roomTraffic !== "number") {
      stageTraffics[room.type] = null;

      continue;
    }

    // @ts-ignore necessary
    stageTraffics[room.type] += roomTraffic;
  }

  return stageTraffics;
};

/** @type {(model: Model, stages: ReadonlyArray<Stage>) => Record<RoomType, number | null>} */
const getTotalTraffics = (model, stages) => {
  /** @type {Record<RoomType, number | null>} */
  const totalTraffics = { exhaust: 0, supply: 0 };

  for (const stage of stages) {
    const traffic = getStageTraffics(model, stage);

    if (traffic.exhaust !== null && totalTraffics.exhaust !== null) {
      totalTraffics.exhaust += traffic.exhaust;
    } else {
      totalTraffics.exhaust = null;
    }

    if (traffic.supply !== null && totalTraffics.supply !== null) {
      totalTraffics.supply += traffic.supply;
    } else {
      totalTraffics.supply = null;
    }
  }

  return totalTraffics;
};

/** @type {(airTraffic: number | RoomAirTrafficError, fieldValue: string | null) => ArrayElem<Exclude<View['step2'], 'fix-prev'>['rooms']>['traffic']} */
const getRoomTrafficField = (airTraffic, fieldValue) => ({
  value:
    fieldValue !== null
      ? fieldValue
      : String(/** @type {number} */ (airTraffic)),
  error: typeof airTraffic !== "number" ? airTraffic : null,
  editable: true,
});

/** @type {(airTraffic: number | RoomAirTrafficError, volume: number) => string | null} */
const getRoomMultiplicity = (airTraffic, volume) =>
  typeof airTraffic === "number"
    ? String((airTraffic / volume).toPrecision(2))
    : null;

/** @type {(model: Model, stageId: number, id: number) => ArrayElem<Exclude<View['step2'], 'fix-prev'>['rooms']>} */
const getStep2Room = (model, stageId, id) => {
  const stage = model.stages[stageId];
  const room = stage.rooms[id];

  const airTraffic = getRoomAirTraffic(model, stage, room);
  const volume = getRoomVolume(stage, room);

  return {
    traffic: getRoomTrafficField(airTraffic, room.airTraffic),
    multiplicity: getRoomMultiplicity(airTraffic, volume),
    square: String(getRoomSquare(room)),
    orderId: getRoomOrderId(id),
    volume: String(volume),
    name: room.name,
    type: room.type,
    stageId,
    id,
  };
};

/** @type {(room: ArrayElem<Exclude<View['step2'], 'fix-prev'>['rooms']>) => boolean} */
const step2RoomHasError = (room) => false || room.traffic.error !== null;

/** @type {(model: Model, stage: Stage, stageId: number) => StageStep2Error | null} */
const getStageStep2Error = (model, stage, stageId) => {
  if (!stage.enabled) {
    return null;
  }

  if (
    stage.rooms.some((_, id) =>
      step2RoomHasError(getStep2Room(model, stageId, id)),
    )
  ) {
    return { name: "rooms-have-errors" };
  }

  return null;
};

/** @type {(model: Model, stage: Stage, id: number) => ArrayElem<Exclude<View['step2'], 'fix-prev'>['stages']>} */
const getStep2Stage = (model, stage, id) => {
  const traffics = getStageTraffics(model, stage);

  const exhaust = traffics.exhaust !== null ? String(traffics.exhaust) : null;
  const supply = traffics.supply !== null ? String(traffics.supply) : null;

  return {
    active: model.activeStage.step2 === id,
    error: getStageStep2Error(model, stage, id),
    enabled: stage.enabled,
    height: stage.height,
    exhaust,
    supply,
  };
};

/** @type {(model: Model) => number | null} */
const getTotalExhaust = (model) =>
  getTotalTraffics(model, getEnabledStages(model.stages)).exhaust;

/** @type {(model: Model) => number | null} */
const getTotalSupply = (model) =>
  getTotalTraffics(model, getEnabledStages(model.stages)).supply;

/** @type {(model: Model) => Exclude<View['step2'], 'fix-prev'>} */
const getStep2 = (model) => {
  const activeStageId = model.activeStage.step2;
  const activeStage = model.stages[activeStageId];

  return {
    exhaust:
      getTotalExhaust(model) !== null ? String(getTotalExhaust(model)) : null,
    rooms: activeStage.rooms.map((_, id) =>
      getStep2Room(model, activeStageId, id),
    ),
    supply:
      getTotalSupply(model) !== null ? String(getTotalSupply(model)) : null,
    stages: model.stages.map((stage, id) => getStep2Stage(model, stage, id)),
  };
};

/** @type {(step2: Exclude<View['step2'], 'fix-prev'>) => boolean} */
const step2HasErrors = (step2) =>
  false || step2.exhaust === null || step2.supply === null;

/** @type {(model: Model, stage: Stage, room: Room) => number} */
const getRoomAirDuctPipesCount = (model, stage, room) => {
  const traffic = getRoomAirTraffic(model, stage, room);

  if (typeof traffic !== "number") {
    return 0;
  }

  return (traffic % airDuctPipeBandwidth > 5 ? Math.ceil : Math.floor)(
    traffic / airDuctPipeBandwidth,
  );
};

/** @type {(model: Model, stageId: number, id: number, order: number) => ArrayElem<Exclude<View['step3'], 'fix-prev'>['rooms']>} */
const getStep3Room = (model, stageId, id, order) => {
  const stage = model.stages[stageId];
  const room = stage.rooms[id];

  const airTraffic = getRoomAirTraffic(model, stage, room);
  const volume = getRoomVolume(stage, room);

  return {
    airDuctPipesCount: String(getRoomAirDuctPipesCount(model, stage, room)),
    multiplicity: getRoomMultiplicity(airTraffic, volume),
    square: String(getRoomSquare(room)),
    orderId: getRoomOrderId(order),
    volume: String(volume),
    name: room.name,
    type: room.type,
    stageId,
    id,
  };
};

/** @type {(model: Model) => Exclude<View['step3'], 'fix-prev'>['rooms']} */
const getStep3Rooms = (model) => {
  /** @type {Exclude<View['step3'], 'fix-prev'>['rooms'] extends ReadonlyArray<infer T> ? Array<T> : never} */
  const result = [];

  getEnabledStages(model.stages).forEach((stage, stageId) => {
    stage.rooms.forEach((_, id) => {
      result.push(getStep3Room(model, stageId, id, result.length));
    });
  });

  return result;
};

/** @type {(model: Model) => Record<RoomType, number>} */
const getTotalAirDuctPipesCount = (model) => {
  /** @type {Record<RoomType, number>} */
  const result = {
    supply: 0,
    exhaust: 0,
  };

  for (const stage of getEnabledStages(model.stages)) {
    for (const room of stage.rooms) {
      result[room.type] += getRoomAirDuctPipesCount(model, stage, room);
    }
  }

  return result;
};

/** @type {(value: string) => DistanceToCollectorError | null}1 */
const getDistanceToCollectorError = probablyEmpty(
  numberCompatibleString(
    withMin(minDistanceToCollector, withMax(maxDistanceToCollector, end)),
  ),
);

/** @type {(value: string) => WallToMachineDistanceError | null}1 */
const getWallToMachineDistanceError = probablyEmpty(
  numberCompatibleString(
    withMin(minWallToMachineDistance, withMax(maxWallToMachineDistance, end)),
  ),
);

/** @type {(value: string) => OutletsCountError | null}1 */
const getOutletsCountError = probablyEmpty(
  numberCompatibleString(
    withMin(minOutletsCount, withMax(maxOutletsCount, end)),
  ),
);

/** @type {(model: Model, stage: Stage, id: number) => ArrayElem<Exclude<View['step3'], 'fix-prev'>['stages']>} */
const getStep3Stage = (model, stage, id) => ({
  active: id === model.activeStage.vent,
  enabled: stage.enabled,
  height: stage.height,
});

/** @type {(model: Model) => Exclude<View['step3'], 'fix-prev'>} */
const getStep3 = (model) => {
  const exhaust = getTotalExhaust(model);
  const supply = getTotalSupply(model);

  const exchangeType = model.airExchangeType;

  const wallDistance =
    exchangeType === "roof"
      ? {
          airExchangeType: exchangeType,
        }
      : {
          airExchangeType: exchangeType,
          wallToMachineDistance: {
            error: getWallToMachineDistanceError(
              model.distanceToSupplyCollector,
            ),
            value: model.wallToMachineDistance,
            editable: true,
          },
        };

  return {
    stages: model.stages.map((stage, id) => getStep3Stage(model, stage, id)),
    exhaust: exhaust !== null ? String(exhaust) : "",
    supply: supply !== null ? String(supply) : "",
    distanceToExhaustCollector: {
      error: getDistanceToCollectorError(model.distanceToExhaustCollector),
      value: model.distanceToExhaustCollector,
      editable: true,
    },
    distanceToSupplyCollector: {
      error: getDistanceToCollectorError(model.distanceToSupplyCollector),
      value: model.distanceToSupplyCollector,
      editable: true,
    },
    outletsCount: {
      error: getOutletsCountError(model.outletsCount),
      value: model.outletsCount,
      editable: true,
    },
    silencerType: model.silencerType,
    productLine: model.productLine,
    rooms: getStep3Rooms(model),
    ...wallDistance,
  };
};

/** @type {(step3: Exclude<View['step3'], 'fix-prev'>) => boolean} */
const step3HasErrors = (step3) =>
  some ||
  step3.outletsCount.error !== null ||
  (every &&
    step3.airExchangeType === "wall" &&
    step3.wallToMachineDistance.error !== null) ||
  step3.distanceToSupplyCollector.error !== null ||
  step3.distanceToExhaustCollector.error !== null;

/** @type {(model: Model) => { status: Step4Status, productLine: ChosenProductLine }} */
const getStep4StatusAndProductLine = (model) => {
  const airDuctPipeCount = getTotalAirDuctPipesCount(model);

  if (airDuctPipeCount.supply > 24 || airDuctPipeCount.exhaust > 24) {
    return { status: "incorrect-task", productLine: model.productLine };
  }

  if (
    model.productLine !== "classic" &&
    (airDuctPipeCount.supply > 12 || airDuctPipeCount.exhaust > 12)
  ) {
    return { status: "preferred-classic", productLine: "classic" };
  }

  return { status: "ok", productLine: model.productLine };
};

/** @type {(stages: ReadonlyArray<Stage>, ventStage: number) => Array<Stage>} */
const getStagesFromVentToRoof = (stages, ventStage) => {
  const result = stages.slice(ventStage);

  while (true) {
    const last = result.pop();

    if (last === undefined) {
      return [];
    }

    if (last.enabled) {
      return [...result, last];
    }
  }
};

/** @type {(model: Model, product: FinalProductData, index: number) => FinalProductDataView} */
const getFinalProductDataView = (model, product, index) => {
  const countOffset = model.productsCountOffsets.get(product.id);
  const count = product.count + (countOffset || 0);
  const canLess = count !== 0;

  return { ...product, count, canLess, canMore: true, orderId: index + 1 };
};

/** @type {(model: Model) => Exclude<View['step4'], 'fix-prev'>} */
const getStep4 = (model) => {
  const { status, productLine } = getStep4StatusAndProductLine(model);

  if (status === "incorrect-task") {
    return { status };
  }

  /** @type {Record<RoomType, ProductLine>} */
  const productLines = {
    exhaust: productLine !== "combined" ? productLine : "classic",
    supply: productLine !== "combined" ? productLine : "slim",
  };

  // Р Р°СЃС‡РµС‚ РІРѕР·РґСѓС…РѕРІРѕРґРѕРІ РїРѕ Р»РёРЅРµР№РєР°Рј РїСЂРѕРґСѓРєС‚РѕРІ

  const airDuctPipeCount = getTotalAirDuctPipesCount(model);

  /** @type {Record<ProductLine, number>} */
  const airDuctPipesCount = {
    classic:
      (productLines.supply === "classic" ? airDuctPipeCount.supply : 0) +
      (productLines.exhaust === "classic" ? airDuctPipeCount.exhaust : 0),
    slim:
      (productLines.supply === "slim" ? airDuctPipeCount.supply : 0) +
      (productLines.exhaust === "slim" ? airDuctPipeCount.exhaust : 0),
  };

  /** @type {Record<ProductLine, number>} */
  const airDuctLength = {
    classic: airDuctPipesCount.classic * airDuctPipeLength,
    slim: airDuctPipesCount.slim * airDuctPipeLength,
  };

  // Р Р°СЃС‡РµС‚ СЃРїРёСЃРєР° РїСЂРѕРґСѓРєС‚РѕРІ

  let classicConnectorCount = 0;
  let slim1ConnectorCount = 0;
  let slim3ConnectorCount = 0;

  let connectorVolumeRegulationValveCount = 0;

  for (const stage of getEnabledStages(model.stages)) {
    for (const room of stage.rooms) {
      const pipeCount = getRoomAirDuctPipesCount(model, stage, room);

      /* istanbul ignore next */
      if (pipeCount === undefined) {
        throw new Error("Room pipe count is undefined");
      }

      if (productLines[room.type] === "classic") {
        classicConnectorCount += Math.ceil(pipeCount / 2);

        continue;
      }

      if (pipeCount <= 1) {
        slim1ConnectorCount += pipeCount;
      } else {
        slim3ConnectorCount += Math.ceil(pipeCount / 3);
        connectorVolumeRegulationValveCount += pipeCount;
      }
    }
  }

  /** @type {Record<ProductLine, number>} */
  const collectorsCount = {
    classic: 0,
    slim: 0,
  };

  collectorsCount[productLines.supply] +=
    airDuctPipesCount[productLines.supply] > 0 ? 1 : 0;
  collectorsCount[productLines.exhaust] +=
    airDuctPipesCount[productLines.exhaust] > 0 ? 1 : 0;

  /** @type {Products['collector']} */
  const collectors = {
    classic:
      collectorsCount.classic === 0
        ? 0
        : {
            count: collectorsCount.classic,
            holes: getClassicCollectorSize(
              productLine === "classic"
                ? Math.max(airDuctPipeCount.exhaust, airDuctPipeCount.supply)
                : airDuctPipesCount.classic,
            ),
          },
    slim:
      productLine === "classic" || collectorsCount.slim === 0
        ? 0
        : {
            count: collectorsCount.slim,
            holes: getSlimCollectorSize(airDuctPipesCount.slim),
          },
  };

  /** @type {Products['collector_plug']} */
  const collectorPlugs = {
    classic: 0,
    slim: 0,
  };

  for (const roomType of roomTypes) {
    const collector = collectors[productLines[roomType]];
    const productLine = productLines[roomType];

    if (collector !== 0 && productLine !== "slim") {
      collectorPlugs[productLine] +=
        collector.holes - airDuctPipeCount[roomType];
    }
  }

  const isoPipeDiameter =
    collectors.classic !== 0 && collectors.classic.holes === 24 ? 200 : 160;

  const distanceToExhaustCollector =
    model.distanceToExhaustCollector === ""
      ? 0
      : Number.parseInt(model.distanceToExhaustCollector, 10);
  const distanceToSupplyCollector =
    model.distanceToSupplyCollector === ""
      ? 0
      : Number.parseInt(model.distanceToSupplyCollector, 10);

  const isoPipeLength = Math.ceil(
    ((distanceToExhaustCollector + distanceToSupplyCollector) * 100 +
      (model.airExchangeType === "roof"
        ? getStagesFromVentToRoof(mxdel.stages, model.activeStage.vent).reduce(
            (sum, stage) =>
              sum +
              (getStageHeightError(stage) !== null
                ? defaultStageHeight
                : Number.parseInt(stage.height, 10)) +
              distanceBetweenStages,
            0,
          )
        : Number.parseInt(model.wallToMachineDistance, 10) * 2 * 100)) /
      100,
  );

  /** @type {Products} */
  const products = {
    air_duct: {
      classic: getAirDuctProductCount(airDuctLength.classic, "classic"),
      slim: getAirDuctProductCount(airDuctLength.slim, "slim"),
    },
    mounting_clip: {
      classic: Math.ceil(getMountingClipCount(airDuctLength.classic) / 10),
      slim: getMountingClipCount(airDuctLength.slim),
    },
    seal_ring: Math.ceil((airDuctPipesCount.classic * 2) / 10),
    connector_classic: classicConnectorCount,
    connector_slim_1: slim1ConnectorCount,
    connector_slim_3: slim3ConnectorCount,
    air_duct_plug: {
      classic: getAirDuctPlugCount(airDuctPipesCount.classic),
      slim: getAirDuctPlugCount(airDuctPipesCount.slim),
    },
    vent_knife: airDuctPipesCount.classic > 0 ? 1 : 0,
    collector: collectors,
    connector_volume_regulation_valve: 0,
    collector_plug: collectorPlugs,
    diffuser: classicConnectorCount,
    silencer: {
      count: 2,
      diameter: isoPipeDiameter,
    },
    iso_pipe: {
      count: isoPipeLength,
      diameter: isoPipeDiameter,
    },
    iso_pipe_coupling: {
      count: Number.parseInt(model.outletsCount, 10) || 0,
      diameter: isoPipeDiameter,
    },
    iso_pipe_clamp: {
      count: isoPipeLength,
      diameter: isoPipeDiameter,
    },
    electric_valve: {
      count: 2,
      diameter: isoPipeDiameter,
    },
    vent_hood: {
      count: model.airExchangeType === "wall" ? 2 : 0,
      diameter: isoPipeDiameter,
    },
    panel_1: slim1ConnectorCount,
    panel_3: slim3ConnectorCount,
    outlet: {
      count: Number.parseInt(model.outletsCount, 10) || 0,
      diameter: isoPipeDiameter,
    },
  };

  const finalProductData = getProducts(model, products).filter(
    ({ id }) => !model.filteredOutProducts.has(id),
  );
  const finalProductDataView = finalProductData.map((product, i) =>
    getFinalProductDataView(model, product, i),
  );
  const total = finalProductDataView.reduce(
    (acc, p) => acc + p.count * p.price,
    0,
  );

  return { status, products: finalProductDataView, total };
};

/** @type {(model: Model) => View['modal']} */
const getModalView = (model) => {
  const modal = model.activeModal;

  if (modal === null) {
    return null;
  }

  return {
    room: modal.room,
    name: modal.name,
    stage: modal.stage,
    roomName: {
      editable: true,
      value: modal.roomName,
      error: getRoomNameError(modal.roomName),
    },
    length: {
      editable: true,
      value: modal.length,
      error: getRoomWallError(modal.length),
    },
    width: {
      editable: true,
      value: modal.width,
      error: getRoomWallError(modal.width),
    },
    square: {
      editable: true,
      value: modal.square,
      error: getRoomSquareError(modal.square),
    },
  };
};

/** @type {(model: Model) => View} */
const view = (model) => {
  const modal = getModalView(model);

  const step1 = getStep1(model);

  if (step1HasErrors(step1)) {
    return {
      step1,
      step2: "fix-prev",
      step3: "fix-prev",
      step4: "fix-prev",
      modal,
    };
  }

  const step2 = getStep2(model);

  if (step2HasErrors(step2)) {
    return {
      step1,
      step2,
      step3: "fix-prev",
      step4: "fix-prev",
      modal,
    };
  }

  const step3 = getStep3(model);

  if (step3HasErrors(step3)) {
    return {
      step1,
      step2,
      step3,
      step4: "fix-prev",
      modal,
    };
  }

  const step4 = getStep4(model);

  return {
    step1,
    step2,
    step3,
    step4,
    modal,
  };
};

/** @type {(render: (view: View) => void, products?: ReadonlyArray<DBProductData>) => (cmd: Command) => void} */
export const getPlanner = (render, products) => {
  /** @type {Model} */
  let model = init(products || testProducts);

  render(view(model));

  return (cmd) => {
    model = update(cmd, model);

    render(view(model));
  };
};
