const Color4 = (x,y,z,a) => Object.freeze([x,y,z,a])
const Vector2D     = (x,y) => Object.freeze([x,y]),
      Vector2DZero = () => Vector2D(0,0)
      
//these functions take 1 Vector2D, wrapper is the return type
const OneVector2Transform = wrapperFn => op => ([x,y]) => wrapperFn(op(x),op(y)),
      OneReturnVector2D = OneVector2Transform(Vector2D), //wrapper
            Vector2Negate     = OneReturnVector2D(negate),
            Vector2Scale      = vec => scale => OneReturnVector2D(curMul(scale))(vec),
            Vector2LenSqr     = vec => sum(...OneReturnVector2D(square)(vec)),
            Vector2Length     = compose(Math.sqrt, Vector2LenSqr)
            Vector2Normalize  = (vec, len = Vector2Length(vec)) => !equalsZero(len) 
                              ? OneReturnVector2D(curMul(div(1.0,len)))(vec)
                              : false     

//vector transformations with 2 vectors, wrapperFn is the return type i.e. Vector2D, boolean, etc
const TwoVector2Transform = wrapperFn => op => ([x1,y1], [x2,y2]) => wrapperFn(op(x1,x2), op(y1,y2)),
      TwoReturnVector2    = TwoVector2Transform(Vector2D),//wrapperFn
            Vector2Add        = TwoReturnVector2(sum),
            Vector2Sub        = TwoReturnVector2(sub),
            Vector2Mul        = TwoReturnVector2(mul),
            Vector2Div        = TwoReturnVector2(div),
            Vector2DistSqr    = (v1,v2) => Vector2LenSqr(Vector2Sub(v1,v2)),
            Vector2Dist       = (v1,v2) => Math.sqrt (Vector2DistSqr(v1,v2)),

      BothVector2 = TwoVector2Transform(both),   //wrapperFn
            Vector2Min   = BothVector2(lt),
            Vector2Max   = BothVector2(gt),
            Vector2Eq    = BothVector2(eq),

      //takes a transformation function, and returns either vector
      compareVector2 = xform => (v1,v2) => 
                            xform(v1,v2) ? v1 
                          : xform(v2,v1) ? v2 
                          : false,
            smallestVector2 = compareVector2(Vector2Min),
            largestVector2  = compareVector2(Vector2Max)

const V1 = Vector2D(1,3),
      V2 = Vector2D(3,4),
      V3 = Vector2D(4,3)


// console.log('Vector2 neg      \t',Vector2Negate(V1))
// console.log('Vector2 norm     \t',Vector2Normalize(V1))
// console.log('Vector2 scale    \t',Vector2Scale(2)(V1))
// console.log('Vector2 lensqr   \t',Vector2LenSqr(V1))
// console.log('Vector2 len      \t', Vector2Length(V1))
// console.log('Vector2 zero     \t', Vector2DZero())
// console.log('Vector2 add      \t', Vector2Add(V1,V2))
// console.log('Vector2 sub      \t', Vector2Sub(V1,V2))
// console.log('Vector2 div      \t', Vector2Div(V1,V2))
// console.log('Vector2 dist     \t', Vector2Dist(V1,V2))
// console.log('Vector2 distsqr  \t',Vector2DistSqr(V1,V2))
// console.log('Vector2 min      \t', Vector2Min(V1,V2))
// console.log('Vector2 max      \t', Vector2Max(V1,V2))
// console.log('Vector2 eq       \t', Vector2Eq(V1,V2))
// console.log('Vector2 smallest \t',smallestVector2(V1,V2))
// console.log('Vector2 largest  \t',largestVector2(V1,V2))



//Vector3----------------------------------------------------
const Vector3     = (x,y,z) => Object.freeze([x,y,z]),
      Vector30    = () => [0,0,0],
      Vector3UP   = () => [0,1.0,0],
      Vector3Copy = vec => Vector3(...vec),
      Vector3FromArray = (arr, offset = 0) => Vector3(array[offset], array[offset + 1], array[offset + 2])

//Takes a return type/wrapper function, a math function, and 1 Vector3 as argument
const OneVector3Transform = wrapperFn => op => ([x,y,z]) => wrapperFn(op(x), op(y), op(z)),
      OneVector3          = OneVector3Transform(Vector3),

      Vector3Neg    = OneVector3(negate),
      Vector3Scale  = scale => OneVector3(curryMul(scale)),
      Vector3LenSqr = vec   => OneVector3(square)(vec).reduce(sum),
      Vector3Len    = vec   => Math.sqrt(Vector3LenSqr(vec)),
      Vector3Norm   = (vec, len = Vector3Len(vec)) => {
                    return eq(0,len)
                    ? OneVector3(curMul(div(1.0,len)))(vec)
                    : false}

//Takes a return type/wrapper function, a math function, and 2 Vector3 as argument
const TwoVector3Transform = wrapperFn => op => ([x1,y1,z1], [x2,y2,z2]) => wrapperFn(op(x1,x2), op(y1,y2), op(z1,z2)),
      ReturnVector3       = TwoVector3Transform(Vector3),
      Vector3Add = ReturnVector3(sum),
      Vector3Mul = ReturnVector3(mul),
      Vector3Sub = ReturnVector3(sub),
      Vector3Div = ReturnVector3(div),
      Vector3Eq  = ReturnVector3(eq),

      Vector3Dot     = (v1,v2) => Vector3Mul(v1,v2).reduce(sum),
      Vector3Dist    = (v1,v2) => compose(Math.sqrt, Vector3DistSqr),
      Vector3DistSqr = (v1,v2) => Vector3Sub(v1,v2).reduce(compose(sum, square))


const Vector3Cross = ([x1,y1,z1],[x2,y2,z2]) => Vector3(
      sub(mul(x1,z2), mul(z1,y2)),
      sub(mul(z1,x2), mul(x1,z2)),
      sub(mul(x1,y2), mul(y1,x2)))

const v1 = Vector3(1,2,3),
      v2 = Vector3(4,5,6),
      v3 = Vector3(7,8,9)


// console.log('Vector3 neg      \t',Vector3Neg(v1))
// console.log('Vector3 norm     \t',Vector3Norm(v1))
// console.log('Vector3 scale    \t',Vector3Scale(2)(v1))
// console.log('Vector3 lensqr   \t',Vector3LenSqr(v1))
// console.log('Vector3 len      \t', Vector3Len(v1))
// console.log('Vector3 zero     \t', Vector3Zero())
// console.log('Vector3 add      \t', Vector3Add(v1,v2))
// console.log('Vector3 sub      \t', Vector3Sub(v1,v2))
// console.log('Vector3 div      \t', Vector3Div(v1,v2))
// console.log('Vector3 dist     \t', Vector3Dist(v1,v2))
// console.log('Vector3 distsqr  \t',Vector3DistSqr(v1,v2))
// console.log('Vector3 eq       \t', Vector3Eq(v1,v2))

