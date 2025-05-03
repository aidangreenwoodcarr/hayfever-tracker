
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model HayfeverEntry
 * 
 */
export type HayfeverEntry = $Result.DefaultSelection<Prisma.$HayfeverEntryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more HayfeverEntries
 * const hayfeverEntries = await prisma.hayfeverEntry.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more HayfeverEntries
   * const hayfeverEntries = await prisma.hayfeverEntry.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.hayfeverEntry`: Exposes CRUD operations for the **HayfeverEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HayfeverEntries
    * const hayfeverEntries = await prisma.hayfeverEntry.findMany()
    * ```
    */
  get hayfeverEntry(): Prisma.HayfeverEntryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    HayfeverEntry: 'HayfeverEntry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "hayfeverEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      HayfeverEntry: {
        payload: Prisma.$HayfeverEntryPayload<ExtArgs>
        fields: Prisma.HayfeverEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HayfeverEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HayfeverEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>
          }
          findFirst: {
            args: Prisma.HayfeverEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HayfeverEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>
          }
          findMany: {
            args: Prisma.HayfeverEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>[]
          }
          create: {
            args: Prisma.HayfeverEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>
          }
          createMany: {
            args: Prisma.HayfeverEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HayfeverEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>[]
          }
          delete: {
            args: Prisma.HayfeverEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>
          }
          update: {
            args: Prisma.HayfeverEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>
          }
          deleteMany: {
            args: Prisma.HayfeverEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HayfeverEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HayfeverEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>[]
          }
          upsert: {
            args: Prisma.HayfeverEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HayfeverEntryPayload>
          }
          aggregate: {
            args: Prisma.HayfeverEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHayfeverEntry>
          }
          groupBy: {
            args: Prisma.HayfeverEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<HayfeverEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.HayfeverEntryCountArgs<ExtArgs>
            result: $Utils.Optional<HayfeverEntryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    hayfeverEntry?: HayfeverEntryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model HayfeverEntry
   */

  export type AggregateHayfeverEntry = {
    _count: HayfeverEntryCountAggregateOutputType | null
    _avg: HayfeverEntryAvgAggregateOutputType | null
    _sum: HayfeverEntrySumAggregateOutputType | null
    _min: HayfeverEntryMinAggregateOutputType | null
    _max: HayfeverEntryMaxAggregateOutputType | null
  }

  export type HayfeverEntryAvgAggregateOutputType = {
    sneezing: number | null
    itchyEyes: number | null
    congestion: number | null
    headache: number | null
    outdoorTime: number | null
    locationLat: number | null
    locationLng: number | null
    pollenCount: number | null
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
  }

  export type HayfeverEntrySumAggregateOutputType = {
    sneezing: number | null
    itchyEyes: number | null
    congestion: number | null
    headache: number | null
    outdoorTime: number | null
    locationLat: number | null
    locationLng: number | null
    pollenCount: number | null
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
  }

  export type HayfeverEntryMinAggregateOutputType = {
    id: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    sneezing: number | null
    itchyEyes: number | null
    congestion: number | null
    headache: number | null
    medications: string | null
    medicationEffectiveness: string | null
    outdoorTime: number | null
    activities: string | null
    notes: string | null
    locationLat: number | null
    locationLng: number | null
    locationAddress: string | null
    pollenCount: number | null
    pollenTypes: string | null
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
  }

  export type HayfeverEntryMaxAggregateOutputType = {
    id: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    sneezing: number | null
    itchyEyes: number | null
    congestion: number | null
    headache: number | null
    medications: string | null
    medicationEffectiveness: string | null
    outdoorTime: number | null
    activities: string | null
    notes: string | null
    locationLat: number | null
    locationLng: number | null
    locationAddress: string | null
    pollenCount: number | null
    pollenTypes: string | null
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
  }

  export type HayfeverEntryCountAggregateOutputType = {
    id: number
    date: number
    createdAt: number
    updatedAt: number
    sneezing: number
    itchyEyes: number
    congestion: number
    headache: number
    medications: number
    medicationEffectiveness: number
    outdoorTime: number
    activities: number
    notes: number
    locationLat: number
    locationLng: number
    locationAddress: number
    pollenCount: number
    pollenTypes: number
    temperature: number
    humidity: number
    windSpeed: number
    _all: number
  }


  export type HayfeverEntryAvgAggregateInputType = {
    sneezing?: true
    itchyEyes?: true
    congestion?: true
    headache?: true
    outdoorTime?: true
    locationLat?: true
    locationLng?: true
    pollenCount?: true
    temperature?: true
    humidity?: true
    windSpeed?: true
  }

  export type HayfeverEntrySumAggregateInputType = {
    sneezing?: true
    itchyEyes?: true
    congestion?: true
    headache?: true
    outdoorTime?: true
    locationLat?: true
    locationLng?: true
    pollenCount?: true
    temperature?: true
    humidity?: true
    windSpeed?: true
  }

  export type HayfeverEntryMinAggregateInputType = {
    id?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    sneezing?: true
    itchyEyes?: true
    congestion?: true
    headache?: true
    medications?: true
    medicationEffectiveness?: true
    outdoorTime?: true
    activities?: true
    notes?: true
    locationLat?: true
    locationLng?: true
    locationAddress?: true
    pollenCount?: true
    pollenTypes?: true
    temperature?: true
    humidity?: true
    windSpeed?: true
  }

  export type HayfeverEntryMaxAggregateInputType = {
    id?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    sneezing?: true
    itchyEyes?: true
    congestion?: true
    headache?: true
    medications?: true
    medicationEffectiveness?: true
    outdoorTime?: true
    activities?: true
    notes?: true
    locationLat?: true
    locationLng?: true
    locationAddress?: true
    pollenCount?: true
    pollenTypes?: true
    temperature?: true
    humidity?: true
    windSpeed?: true
  }

  export type HayfeverEntryCountAggregateInputType = {
    id?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    sneezing?: true
    itchyEyes?: true
    congestion?: true
    headache?: true
    medications?: true
    medicationEffectiveness?: true
    outdoorTime?: true
    activities?: true
    notes?: true
    locationLat?: true
    locationLng?: true
    locationAddress?: true
    pollenCount?: true
    pollenTypes?: true
    temperature?: true
    humidity?: true
    windSpeed?: true
    _all?: true
  }

  export type HayfeverEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HayfeverEntry to aggregate.
     */
    where?: HayfeverEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HayfeverEntries to fetch.
     */
    orderBy?: HayfeverEntryOrderByWithRelationInput | HayfeverEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HayfeverEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HayfeverEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HayfeverEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HayfeverEntries
    **/
    _count?: true | HayfeverEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HayfeverEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HayfeverEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HayfeverEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HayfeverEntryMaxAggregateInputType
  }

  export type GetHayfeverEntryAggregateType<T extends HayfeverEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateHayfeverEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHayfeverEntry[P]>
      : GetScalarType<T[P], AggregateHayfeverEntry[P]>
  }




  export type HayfeverEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HayfeverEntryWhereInput
    orderBy?: HayfeverEntryOrderByWithAggregationInput | HayfeverEntryOrderByWithAggregationInput[]
    by: HayfeverEntryScalarFieldEnum[] | HayfeverEntryScalarFieldEnum
    having?: HayfeverEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HayfeverEntryCountAggregateInputType | true
    _avg?: HayfeverEntryAvgAggregateInputType
    _sum?: HayfeverEntrySumAggregateInputType
    _min?: HayfeverEntryMinAggregateInputType
    _max?: HayfeverEntryMaxAggregateInputType
  }

  export type HayfeverEntryGroupByOutputType = {
    id: string
    date: Date
    createdAt: Date
    updatedAt: Date
    sneezing: number
    itchyEyes: number
    congestion: number
    headache: number
    medications: string
    medicationEffectiveness: string
    outdoorTime: number | null
    activities: string
    notes: string | null
    locationLat: number | null
    locationLng: number | null
    locationAddress: string | null
    pollenCount: number | null
    pollenTypes: string | null
    temperature: number | null
    humidity: number | null
    windSpeed: number | null
    _count: HayfeverEntryCountAggregateOutputType | null
    _avg: HayfeverEntryAvgAggregateOutputType | null
    _sum: HayfeverEntrySumAggregateOutputType | null
    _min: HayfeverEntryMinAggregateOutputType | null
    _max: HayfeverEntryMaxAggregateOutputType | null
  }

  type GetHayfeverEntryGroupByPayload<T extends HayfeverEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HayfeverEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HayfeverEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HayfeverEntryGroupByOutputType[P]>
            : GetScalarType<T[P], HayfeverEntryGroupByOutputType[P]>
        }
      >
    >


  export type HayfeverEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sneezing?: boolean
    itchyEyes?: boolean
    congestion?: boolean
    headache?: boolean
    medications?: boolean
    medicationEffectiveness?: boolean
    outdoorTime?: boolean
    activities?: boolean
    notes?: boolean
    locationLat?: boolean
    locationLng?: boolean
    locationAddress?: boolean
    pollenCount?: boolean
    pollenTypes?: boolean
    temperature?: boolean
    humidity?: boolean
    windSpeed?: boolean
  }, ExtArgs["result"]["hayfeverEntry"]>

  export type HayfeverEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sneezing?: boolean
    itchyEyes?: boolean
    congestion?: boolean
    headache?: boolean
    medications?: boolean
    medicationEffectiveness?: boolean
    outdoorTime?: boolean
    activities?: boolean
    notes?: boolean
    locationLat?: boolean
    locationLng?: boolean
    locationAddress?: boolean
    pollenCount?: boolean
    pollenTypes?: boolean
    temperature?: boolean
    humidity?: boolean
    windSpeed?: boolean
  }, ExtArgs["result"]["hayfeverEntry"]>

  export type HayfeverEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sneezing?: boolean
    itchyEyes?: boolean
    congestion?: boolean
    headache?: boolean
    medications?: boolean
    medicationEffectiveness?: boolean
    outdoorTime?: boolean
    activities?: boolean
    notes?: boolean
    locationLat?: boolean
    locationLng?: boolean
    locationAddress?: boolean
    pollenCount?: boolean
    pollenTypes?: boolean
    temperature?: boolean
    humidity?: boolean
    windSpeed?: boolean
  }, ExtArgs["result"]["hayfeverEntry"]>

  export type HayfeverEntrySelectScalar = {
    id?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sneezing?: boolean
    itchyEyes?: boolean
    congestion?: boolean
    headache?: boolean
    medications?: boolean
    medicationEffectiveness?: boolean
    outdoorTime?: boolean
    activities?: boolean
    notes?: boolean
    locationLat?: boolean
    locationLng?: boolean
    locationAddress?: boolean
    pollenCount?: boolean
    pollenTypes?: boolean
    temperature?: boolean
    humidity?: boolean
    windSpeed?: boolean
  }

  export type HayfeverEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "createdAt" | "updatedAt" | "sneezing" | "itchyEyes" | "congestion" | "headache" | "medications" | "medicationEffectiveness" | "outdoorTime" | "activities" | "notes" | "locationLat" | "locationLng" | "locationAddress" | "pollenCount" | "pollenTypes" | "temperature" | "humidity" | "windSpeed", ExtArgs["result"]["hayfeverEntry"]>

  export type $HayfeverEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HayfeverEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      date: Date
      createdAt: Date
      updatedAt: Date
      sneezing: number
      itchyEyes: number
      congestion: number
      headache: number
      medications: string
      medicationEffectiveness: string
      outdoorTime: number | null
      activities: string
      notes: string | null
      locationLat: number | null
      locationLng: number | null
      locationAddress: string | null
      pollenCount: number | null
      pollenTypes: string | null
      temperature: number | null
      humidity: number | null
      windSpeed: number | null
    }, ExtArgs["result"]["hayfeverEntry"]>
    composites: {}
  }

  type HayfeverEntryGetPayload<S extends boolean | null | undefined | HayfeverEntryDefaultArgs> = $Result.GetResult<Prisma.$HayfeverEntryPayload, S>

  type HayfeverEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HayfeverEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HayfeverEntryCountAggregateInputType | true
    }

  export interface HayfeverEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HayfeverEntry'], meta: { name: 'HayfeverEntry' } }
    /**
     * Find zero or one HayfeverEntry that matches the filter.
     * @param {HayfeverEntryFindUniqueArgs} args - Arguments to find a HayfeverEntry
     * @example
     * // Get one HayfeverEntry
     * const hayfeverEntry = await prisma.hayfeverEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HayfeverEntryFindUniqueArgs>(args: SelectSubset<T, HayfeverEntryFindUniqueArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HayfeverEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HayfeverEntryFindUniqueOrThrowArgs} args - Arguments to find a HayfeverEntry
     * @example
     * // Get one HayfeverEntry
     * const hayfeverEntry = await prisma.hayfeverEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HayfeverEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, HayfeverEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HayfeverEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HayfeverEntryFindFirstArgs} args - Arguments to find a HayfeverEntry
     * @example
     * // Get one HayfeverEntry
     * const hayfeverEntry = await prisma.hayfeverEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HayfeverEntryFindFirstArgs>(args?: SelectSubset<T, HayfeverEntryFindFirstArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HayfeverEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HayfeverEntryFindFirstOrThrowArgs} args - Arguments to find a HayfeverEntry
     * @example
     * // Get one HayfeverEntry
     * const hayfeverEntry = await prisma.hayfeverEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HayfeverEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, HayfeverEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HayfeverEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HayfeverEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HayfeverEntries
     * const hayfeverEntries = await prisma.hayfeverEntry.findMany()
     * 
     * // Get first 10 HayfeverEntries
     * const hayfeverEntries = await prisma.hayfeverEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hayfeverEntryWithIdOnly = await prisma.hayfeverEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HayfeverEntryFindManyArgs>(args?: SelectSubset<T, HayfeverEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HayfeverEntry.
     * @param {HayfeverEntryCreateArgs} args - Arguments to create a HayfeverEntry.
     * @example
     * // Create one HayfeverEntry
     * const HayfeverEntry = await prisma.hayfeverEntry.create({
     *   data: {
     *     // ... data to create a HayfeverEntry
     *   }
     * })
     * 
     */
    create<T extends HayfeverEntryCreateArgs>(args: SelectSubset<T, HayfeverEntryCreateArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HayfeverEntries.
     * @param {HayfeverEntryCreateManyArgs} args - Arguments to create many HayfeverEntries.
     * @example
     * // Create many HayfeverEntries
     * const hayfeverEntry = await prisma.hayfeverEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HayfeverEntryCreateManyArgs>(args?: SelectSubset<T, HayfeverEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HayfeverEntries and returns the data saved in the database.
     * @param {HayfeverEntryCreateManyAndReturnArgs} args - Arguments to create many HayfeverEntries.
     * @example
     * // Create many HayfeverEntries
     * const hayfeverEntry = await prisma.hayfeverEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HayfeverEntries and only return the `id`
     * const hayfeverEntryWithIdOnly = await prisma.hayfeverEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HayfeverEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, HayfeverEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HayfeverEntry.
     * @param {HayfeverEntryDeleteArgs} args - Arguments to delete one HayfeverEntry.
     * @example
     * // Delete one HayfeverEntry
     * const HayfeverEntry = await prisma.hayfeverEntry.delete({
     *   where: {
     *     // ... filter to delete one HayfeverEntry
     *   }
     * })
     * 
     */
    delete<T extends HayfeverEntryDeleteArgs>(args: SelectSubset<T, HayfeverEntryDeleteArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HayfeverEntry.
     * @param {HayfeverEntryUpdateArgs} args - Arguments to update one HayfeverEntry.
     * @example
     * // Update one HayfeverEntry
     * const hayfeverEntry = await prisma.hayfeverEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HayfeverEntryUpdateArgs>(args: SelectSubset<T, HayfeverEntryUpdateArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HayfeverEntries.
     * @param {HayfeverEntryDeleteManyArgs} args - Arguments to filter HayfeverEntries to delete.
     * @example
     * // Delete a few HayfeverEntries
     * const { count } = await prisma.hayfeverEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HayfeverEntryDeleteManyArgs>(args?: SelectSubset<T, HayfeverEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HayfeverEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HayfeverEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HayfeverEntries
     * const hayfeverEntry = await prisma.hayfeverEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HayfeverEntryUpdateManyArgs>(args: SelectSubset<T, HayfeverEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HayfeverEntries and returns the data updated in the database.
     * @param {HayfeverEntryUpdateManyAndReturnArgs} args - Arguments to update many HayfeverEntries.
     * @example
     * // Update many HayfeverEntries
     * const hayfeverEntry = await prisma.hayfeverEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HayfeverEntries and only return the `id`
     * const hayfeverEntryWithIdOnly = await prisma.hayfeverEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HayfeverEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, HayfeverEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HayfeverEntry.
     * @param {HayfeverEntryUpsertArgs} args - Arguments to update or create a HayfeverEntry.
     * @example
     * // Update or create a HayfeverEntry
     * const hayfeverEntry = await prisma.hayfeverEntry.upsert({
     *   create: {
     *     // ... data to create a HayfeverEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HayfeverEntry we want to update
     *   }
     * })
     */
    upsert<T extends HayfeverEntryUpsertArgs>(args: SelectSubset<T, HayfeverEntryUpsertArgs<ExtArgs>>): Prisma__HayfeverEntryClient<$Result.GetResult<Prisma.$HayfeverEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HayfeverEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HayfeverEntryCountArgs} args - Arguments to filter HayfeverEntries to count.
     * @example
     * // Count the number of HayfeverEntries
     * const count = await prisma.hayfeverEntry.count({
     *   where: {
     *     // ... the filter for the HayfeverEntries we want to count
     *   }
     * })
    **/
    count<T extends HayfeverEntryCountArgs>(
      args?: Subset<T, HayfeverEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HayfeverEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HayfeverEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HayfeverEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HayfeverEntryAggregateArgs>(args: Subset<T, HayfeverEntryAggregateArgs>): Prisma.PrismaPromise<GetHayfeverEntryAggregateType<T>>

    /**
     * Group by HayfeverEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HayfeverEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HayfeverEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HayfeverEntryGroupByArgs['orderBy'] }
        : { orderBy?: HayfeverEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HayfeverEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHayfeverEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HayfeverEntry model
   */
  readonly fields: HayfeverEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HayfeverEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HayfeverEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HayfeverEntry model
   */
  interface HayfeverEntryFieldRefs {
    readonly id: FieldRef<"HayfeverEntry", 'String'>
    readonly date: FieldRef<"HayfeverEntry", 'DateTime'>
    readonly createdAt: FieldRef<"HayfeverEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"HayfeverEntry", 'DateTime'>
    readonly sneezing: FieldRef<"HayfeverEntry", 'Float'>
    readonly itchyEyes: FieldRef<"HayfeverEntry", 'Float'>
    readonly congestion: FieldRef<"HayfeverEntry", 'Float'>
    readonly headache: FieldRef<"HayfeverEntry", 'Float'>
    readonly medications: FieldRef<"HayfeverEntry", 'String'>
    readonly medicationEffectiveness: FieldRef<"HayfeverEntry", 'String'>
    readonly outdoorTime: FieldRef<"HayfeverEntry", 'Float'>
    readonly activities: FieldRef<"HayfeverEntry", 'String'>
    readonly notes: FieldRef<"HayfeverEntry", 'String'>
    readonly locationLat: FieldRef<"HayfeverEntry", 'Float'>
    readonly locationLng: FieldRef<"HayfeverEntry", 'Float'>
    readonly locationAddress: FieldRef<"HayfeverEntry", 'String'>
    readonly pollenCount: FieldRef<"HayfeverEntry", 'Float'>
    readonly pollenTypes: FieldRef<"HayfeverEntry", 'String'>
    readonly temperature: FieldRef<"HayfeverEntry", 'Float'>
    readonly humidity: FieldRef<"HayfeverEntry", 'Float'>
    readonly windSpeed: FieldRef<"HayfeverEntry", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * HayfeverEntry findUnique
   */
  export type HayfeverEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * Filter, which HayfeverEntry to fetch.
     */
    where: HayfeverEntryWhereUniqueInput
  }

  /**
   * HayfeverEntry findUniqueOrThrow
   */
  export type HayfeverEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * Filter, which HayfeverEntry to fetch.
     */
    where: HayfeverEntryWhereUniqueInput
  }

  /**
   * HayfeverEntry findFirst
   */
  export type HayfeverEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * Filter, which HayfeverEntry to fetch.
     */
    where?: HayfeverEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HayfeverEntries to fetch.
     */
    orderBy?: HayfeverEntryOrderByWithRelationInput | HayfeverEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HayfeverEntries.
     */
    cursor?: HayfeverEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HayfeverEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HayfeverEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HayfeverEntries.
     */
    distinct?: HayfeverEntryScalarFieldEnum | HayfeverEntryScalarFieldEnum[]
  }

  /**
   * HayfeverEntry findFirstOrThrow
   */
  export type HayfeverEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * Filter, which HayfeverEntry to fetch.
     */
    where?: HayfeverEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HayfeverEntries to fetch.
     */
    orderBy?: HayfeverEntryOrderByWithRelationInput | HayfeverEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HayfeverEntries.
     */
    cursor?: HayfeverEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HayfeverEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HayfeverEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HayfeverEntries.
     */
    distinct?: HayfeverEntryScalarFieldEnum | HayfeverEntryScalarFieldEnum[]
  }

  /**
   * HayfeverEntry findMany
   */
  export type HayfeverEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * Filter, which HayfeverEntries to fetch.
     */
    where?: HayfeverEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HayfeverEntries to fetch.
     */
    orderBy?: HayfeverEntryOrderByWithRelationInput | HayfeverEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HayfeverEntries.
     */
    cursor?: HayfeverEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HayfeverEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HayfeverEntries.
     */
    skip?: number
    distinct?: HayfeverEntryScalarFieldEnum | HayfeverEntryScalarFieldEnum[]
  }

  /**
   * HayfeverEntry create
   */
  export type HayfeverEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * The data needed to create a HayfeverEntry.
     */
    data: XOR<HayfeverEntryCreateInput, HayfeverEntryUncheckedCreateInput>
  }

  /**
   * HayfeverEntry createMany
   */
  export type HayfeverEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HayfeverEntries.
     */
    data: HayfeverEntryCreateManyInput | HayfeverEntryCreateManyInput[]
  }

  /**
   * HayfeverEntry createManyAndReturn
   */
  export type HayfeverEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * The data used to create many HayfeverEntries.
     */
    data: HayfeverEntryCreateManyInput | HayfeverEntryCreateManyInput[]
  }

  /**
   * HayfeverEntry update
   */
  export type HayfeverEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * The data needed to update a HayfeverEntry.
     */
    data: XOR<HayfeverEntryUpdateInput, HayfeverEntryUncheckedUpdateInput>
    /**
     * Choose, which HayfeverEntry to update.
     */
    where: HayfeverEntryWhereUniqueInput
  }

  /**
   * HayfeverEntry updateMany
   */
  export type HayfeverEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HayfeverEntries.
     */
    data: XOR<HayfeverEntryUpdateManyMutationInput, HayfeverEntryUncheckedUpdateManyInput>
    /**
     * Filter which HayfeverEntries to update
     */
    where?: HayfeverEntryWhereInput
    /**
     * Limit how many HayfeverEntries to update.
     */
    limit?: number
  }

  /**
   * HayfeverEntry updateManyAndReturn
   */
  export type HayfeverEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * The data used to update HayfeverEntries.
     */
    data: XOR<HayfeverEntryUpdateManyMutationInput, HayfeverEntryUncheckedUpdateManyInput>
    /**
     * Filter which HayfeverEntries to update
     */
    where?: HayfeverEntryWhereInput
    /**
     * Limit how many HayfeverEntries to update.
     */
    limit?: number
  }

  /**
   * HayfeverEntry upsert
   */
  export type HayfeverEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * The filter to search for the HayfeverEntry to update in case it exists.
     */
    where: HayfeverEntryWhereUniqueInput
    /**
     * In case the HayfeverEntry found by the `where` argument doesn't exist, create a new HayfeverEntry with this data.
     */
    create: XOR<HayfeverEntryCreateInput, HayfeverEntryUncheckedCreateInput>
    /**
     * In case the HayfeverEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HayfeverEntryUpdateInput, HayfeverEntryUncheckedUpdateInput>
  }

  /**
   * HayfeverEntry delete
   */
  export type HayfeverEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
    /**
     * Filter which HayfeverEntry to delete.
     */
    where: HayfeverEntryWhereUniqueInput
  }

  /**
   * HayfeverEntry deleteMany
   */
  export type HayfeverEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HayfeverEntries to delete
     */
    where?: HayfeverEntryWhereInput
    /**
     * Limit how many HayfeverEntries to delete.
     */
    limit?: number
  }

  /**
   * HayfeverEntry without action
   */
  export type HayfeverEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HayfeverEntry
     */
    select?: HayfeverEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the HayfeverEntry
     */
    omit?: HayfeverEntryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const HayfeverEntryScalarFieldEnum: {
    id: 'id',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sneezing: 'sneezing',
    itchyEyes: 'itchyEyes',
    congestion: 'congestion',
    headache: 'headache',
    medications: 'medications',
    medicationEffectiveness: 'medicationEffectiveness',
    outdoorTime: 'outdoorTime',
    activities: 'activities',
    notes: 'notes',
    locationLat: 'locationLat',
    locationLng: 'locationLng',
    locationAddress: 'locationAddress',
    pollenCount: 'pollenCount',
    pollenTypes: 'pollenTypes',
    temperature: 'temperature',
    humidity: 'humidity',
    windSpeed: 'windSpeed'
  };

  export type HayfeverEntryScalarFieldEnum = (typeof HayfeverEntryScalarFieldEnum)[keyof typeof HayfeverEntryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type HayfeverEntryWhereInput = {
    AND?: HayfeverEntryWhereInput | HayfeverEntryWhereInput[]
    OR?: HayfeverEntryWhereInput[]
    NOT?: HayfeverEntryWhereInput | HayfeverEntryWhereInput[]
    id?: StringFilter<"HayfeverEntry"> | string
    date?: DateTimeFilter<"HayfeverEntry"> | Date | string
    createdAt?: DateTimeFilter<"HayfeverEntry"> | Date | string
    updatedAt?: DateTimeFilter<"HayfeverEntry"> | Date | string
    sneezing?: FloatFilter<"HayfeverEntry"> | number
    itchyEyes?: FloatFilter<"HayfeverEntry"> | number
    congestion?: FloatFilter<"HayfeverEntry"> | number
    headache?: FloatFilter<"HayfeverEntry"> | number
    medications?: StringFilter<"HayfeverEntry"> | string
    medicationEffectiveness?: StringFilter<"HayfeverEntry"> | string
    outdoorTime?: FloatNullableFilter<"HayfeverEntry"> | number | null
    activities?: StringFilter<"HayfeverEntry"> | string
    notes?: StringNullableFilter<"HayfeverEntry"> | string | null
    locationLat?: FloatNullableFilter<"HayfeverEntry"> | number | null
    locationLng?: FloatNullableFilter<"HayfeverEntry"> | number | null
    locationAddress?: StringNullableFilter<"HayfeverEntry"> | string | null
    pollenCount?: FloatNullableFilter<"HayfeverEntry"> | number | null
    pollenTypes?: StringNullableFilter<"HayfeverEntry"> | string | null
    temperature?: FloatNullableFilter<"HayfeverEntry"> | number | null
    humidity?: FloatNullableFilter<"HayfeverEntry"> | number | null
    windSpeed?: FloatNullableFilter<"HayfeverEntry"> | number | null
  }

  export type HayfeverEntryOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sneezing?: SortOrder
    itchyEyes?: SortOrder
    congestion?: SortOrder
    headache?: SortOrder
    medications?: SortOrder
    medicationEffectiveness?: SortOrder
    outdoorTime?: SortOrderInput | SortOrder
    activities?: SortOrder
    notes?: SortOrderInput | SortOrder
    locationLat?: SortOrderInput | SortOrder
    locationLng?: SortOrderInput | SortOrder
    locationAddress?: SortOrderInput | SortOrder
    pollenCount?: SortOrderInput | SortOrder
    pollenTypes?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    humidity?: SortOrderInput | SortOrder
    windSpeed?: SortOrderInput | SortOrder
  }

  export type HayfeverEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HayfeverEntryWhereInput | HayfeverEntryWhereInput[]
    OR?: HayfeverEntryWhereInput[]
    NOT?: HayfeverEntryWhereInput | HayfeverEntryWhereInput[]
    date?: DateTimeFilter<"HayfeverEntry"> | Date | string
    createdAt?: DateTimeFilter<"HayfeverEntry"> | Date | string
    updatedAt?: DateTimeFilter<"HayfeverEntry"> | Date | string
    sneezing?: FloatFilter<"HayfeverEntry"> | number
    itchyEyes?: FloatFilter<"HayfeverEntry"> | number
    congestion?: FloatFilter<"HayfeverEntry"> | number
    headache?: FloatFilter<"HayfeverEntry"> | number
    medications?: StringFilter<"HayfeverEntry"> | string
    medicationEffectiveness?: StringFilter<"HayfeverEntry"> | string
    outdoorTime?: FloatNullableFilter<"HayfeverEntry"> | number | null
    activities?: StringFilter<"HayfeverEntry"> | string
    notes?: StringNullableFilter<"HayfeverEntry"> | string | null
    locationLat?: FloatNullableFilter<"HayfeverEntry"> | number | null
    locationLng?: FloatNullableFilter<"HayfeverEntry"> | number | null
    locationAddress?: StringNullableFilter<"HayfeverEntry"> | string | null
    pollenCount?: FloatNullableFilter<"HayfeverEntry"> | number | null
    pollenTypes?: StringNullableFilter<"HayfeverEntry"> | string | null
    temperature?: FloatNullableFilter<"HayfeverEntry"> | number | null
    humidity?: FloatNullableFilter<"HayfeverEntry"> | number | null
    windSpeed?: FloatNullableFilter<"HayfeverEntry"> | number | null
  }, "id">

  export type HayfeverEntryOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sneezing?: SortOrder
    itchyEyes?: SortOrder
    congestion?: SortOrder
    headache?: SortOrder
    medications?: SortOrder
    medicationEffectiveness?: SortOrder
    outdoorTime?: SortOrderInput | SortOrder
    activities?: SortOrder
    notes?: SortOrderInput | SortOrder
    locationLat?: SortOrderInput | SortOrder
    locationLng?: SortOrderInput | SortOrder
    locationAddress?: SortOrderInput | SortOrder
    pollenCount?: SortOrderInput | SortOrder
    pollenTypes?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    humidity?: SortOrderInput | SortOrder
    windSpeed?: SortOrderInput | SortOrder
    _count?: HayfeverEntryCountOrderByAggregateInput
    _avg?: HayfeverEntryAvgOrderByAggregateInput
    _max?: HayfeverEntryMaxOrderByAggregateInput
    _min?: HayfeverEntryMinOrderByAggregateInput
    _sum?: HayfeverEntrySumOrderByAggregateInput
  }

  export type HayfeverEntryScalarWhereWithAggregatesInput = {
    AND?: HayfeverEntryScalarWhereWithAggregatesInput | HayfeverEntryScalarWhereWithAggregatesInput[]
    OR?: HayfeverEntryScalarWhereWithAggregatesInput[]
    NOT?: HayfeverEntryScalarWhereWithAggregatesInput | HayfeverEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HayfeverEntry"> | string
    date?: DateTimeWithAggregatesFilter<"HayfeverEntry"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"HayfeverEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HayfeverEntry"> | Date | string
    sneezing?: FloatWithAggregatesFilter<"HayfeverEntry"> | number
    itchyEyes?: FloatWithAggregatesFilter<"HayfeverEntry"> | number
    congestion?: FloatWithAggregatesFilter<"HayfeverEntry"> | number
    headache?: FloatWithAggregatesFilter<"HayfeverEntry"> | number
    medications?: StringWithAggregatesFilter<"HayfeverEntry"> | string
    medicationEffectiveness?: StringWithAggregatesFilter<"HayfeverEntry"> | string
    outdoorTime?: FloatNullableWithAggregatesFilter<"HayfeverEntry"> | number | null
    activities?: StringWithAggregatesFilter<"HayfeverEntry"> | string
    notes?: StringNullableWithAggregatesFilter<"HayfeverEntry"> | string | null
    locationLat?: FloatNullableWithAggregatesFilter<"HayfeverEntry"> | number | null
    locationLng?: FloatNullableWithAggregatesFilter<"HayfeverEntry"> | number | null
    locationAddress?: StringNullableWithAggregatesFilter<"HayfeverEntry"> | string | null
    pollenCount?: FloatNullableWithAggregatesFilter<"HayfeverEntry"> | number | null
    pollenTypes?: StringNullableWithAggregatesFilter<"HayfeverEntry"> | string | null
    temperature?: FloatNullableWithAggregatesFilter<"HayfeverEntry"> | number | null
    humidity?: FloatNullableWithAggregatesFilter<"HayfeverEntry"> | number | null
    windSpeed?: FloatNullableWithAggregatesFilter<"HayfeverEntry"> | number | null
  }

  export type HayfeverEntryCreateInput = {
    id?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    sneezing: number
    itchyEyes: number
    congestion: number
    headache: number
    medications: string
    medicationEffectiveness: string
    outdoorTime?: number | null
    activities: string
    notes?: string | null
    locationLat?: number | null
    locationLng?: number | null
    locationAddress?: string | null
    pollenCount?: number | null
    pollenTypes?: string | null
    temperature?: number | null
    humidity?: number | null
    windSpeed?: number | null
  }

  export type HayfeverEntryUncheckedCreateInput = {
    id?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    sneezing: number
    itchyEyes: number
    congestion: number
    headache: number
    medications: string
    medicationEffectiveness: string
    outdoorTime?: number | null
    activities: string
    notes?: string | null
    locationLat?: number | null
    locationLng?: number | null
    locationAddress?: string | null
    pollenCount?: number | null
    pollenTypes?: string | null
    temperature?: number | null
    humidity?: number | null
    windSpeed?: number | null
  }

  export type HayfeverEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sneezing?: FloatFieldUpdateOperationsInput | number
    itchyEyes?: FloatFieldUpdateOperationsInput | number
    congestion?: FloatFieldUpdateOperationsInput | number
    headache?: FloatFieldUpdateOperationsInput | number
    medications?: StringFieldUpdateOperationsInput | string
    medicationEffectiveness?: StringFieldUpdateOperationsInput | string
    outdoorTime?: NullableFloatFieldUpdateOperationsInput | number | null
    activities?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    locationLat?: NullableFloatFieldUpdateOperationsInput | number | null
    locationLng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    pollenCount?: NullableFloatFieldUpdateOperationsInput | number | null
    pollenTypes?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type HayfeverEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sneezing?: FloatFieldUpdateOperationsInput | number
    itchyEyes?: FloatFieldUpdateOperationsInput | number
    congestion?: FloatFieldUpdateOperationsInput | number
    headache?: FloatFieldUpdateOperationsInput | number
    medications?: StringFieldUpdateOperationsInput | string
    medicationEffectiveness?: StringFieldUpdateOperationsInput | string
    outdoorTime?: NullableFloatFieldUpdateOperationsInput | number | null
    activities?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    locationLat?: NullableFloatFieldUpdateOperationsInput | number | null
    locationLng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    pollenCount?: NullableFloatFieldUpdateOperationsInput | number | null
    pollenTypes?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type HayfeverEntryCreateManyInput = {
    id?: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    sneezing: number
    itchyEyes: number
    congestion: number
    headache: number
    medications: string
    medicationEffectiveness: string
    outdoorTime?: number | null
    activities: string
    notes?: string | null
    locationLat?: number | null
    locationLng?: number | null
    locationAddress?: string | null
    pollenCount?: number | null
    pollenTypes?: string | null
    temperature?: number | null
    humidity?: number | null
    windSpeed?: number | null
  }

  export type HayfeverEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sneezing?: FloatFieldUpdateOperationsInput | number
    itchyEyes?: FloatFieldUpdateOperationsInput | number
    congestion?: FloatFieldUpdateOperationsInput | number
    headache?: FloatFieldUpdateOperationsInput | number
    medications?: StringFieldUpdateOperationsInput | string
    medicationEffectiveness?: StringFieldUpdateOperationsInput | string
    outdoorTime?: NullableFloatFieldUpdateOperationsInput | number | null
    activities?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    locationLat?: NullableFloatFieldUpdateOperationsInput | number | null
    locationLng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    pollenCount?: NullableFloatFieldUpdateOperationsInput | number | null
    pollenTypes?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type HayfeverEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sneezing?: FloatFieldUpdateOperationsInput | number
    itchyEyes?: FloatFieldUpdateOperationsInput | number
    congestion?: FloatFieldUpdateOperationsInput | number
    headache?: FloatFieldUpdateOperationsInput | number
    medications?: StringFieldUpdateOperationsInput | string
    medicationEffectiveness?: StringFieldUpdateOperationsInput | string
    outdoorTime?: NullableFloatFieldUpdateOperationsInput | number | null
    activities?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    locationLat?: NullableFloatFieldUpdateOperationsInput | number | null
    locationLng?: NullableFloatFieldUpdateOperationsInput | number | null
    locationAddress?: NullableStringFieldUpdateOperationsInput | string | null
    pollenCount?: NullableFloatFieldUpdateOperationsInput | number | null
    pollenTypes?: NullableStringFieldUpdateOperationsInput | string | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    humidity?: NullableFloatFieldUpdateOperationsInput | number | null
    windSpeed?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HayfeverEntryCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sneezing?: SortOrder
    itchyEyes?: SortOrder
    congestion?: SortOrder
    headache?: SortOrder
    medications?: SortOrder
    medicationEffectiveness?: SortOrder
    outdoorTime?: SortOrder
    activities?: SortOrder
    notes?: SortOrder
    locationLat?: SortOrder
    locationLng?: SortOrder
    locationAddress?: SortOrder
    pollenCount?: SortOrder
    pollenTypes?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
  }

  export type HayfeverEntryAvgOrderByAggregateInput = {
    sneezing?: SortOrder
    itchyEyes?: SortOrder
    congestion?: SortOrder
    headache?: SortOrder
    outdoorTime?: SortOrder
    locationLat?: SortOrder
    locationLng?: SortOrder
    pollenCount?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
  }

  export type HayfeverEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sneezing?: SortOrder
    itchyEyes?: SortOrder
    congestion?: SortOrder
    headache?: SortOrder
    medications?: SortOrder
    medicationEffectiveness?: SortOrder
    outdoorTime?: SortOrder
    activities?: SortOrder
    notes?: SortOrder
    locationLat?: SortOrder
    locationLng?: SortOrder
    locationAddress?: SortOrder
    pollenCount?: SortOrder
    pollenTypes?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
  }

  export type HayfeverEntryMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sneezing?: SortOrder
    itchyEyes?: SortOrder
    congestion?: SortOrder
    headache?: SortOrder
    medications?: SortOrder
    medicationEffectiveness?: SortOrder
    outdoorTime?: SortOrder
    activities?: SortOrder
    notes?: SortOrder
    locationLat?: SortOrder
    locationLng?: SortOrder
    locationAddress?: SortOrder
    pollenCount?: SortOrder
    pollenTypes?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
  }

  export type HayfeverEntrySumOrderByAggregateInput = {
    sneezing?: SortOrder
    itchyEyes?: SortOrder
    congestion?: SortOrder
    headache?: SortOrder
    outdoorTime?: SortOrder
    locationLat?: SortOrder
    locationLng?: SortOrder
    pollenCount?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    windSpeed?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}