// import {FC} from "react"
// import {TextField} from "@mui/material"
// import {TextFieldProps} from "@mui/material"
// import {Controller, FieldValues, UseControllerProps} from 'react-hook-form'
//
// export const useRHFTextField = <T extends FieldValues>() => {
//
//     const RHFTextField: FC<TextFieldProps & UseControllerProps<T>> = props => {
//         const {
//             control,
//             name,
//             defaultValue,
//             ...other
//         } = props
//
//         return (
//             <Controller
//                 contr ol={control}
//                 name={name}
//                 defaultValue={defaultValue}
//                 render={({field}) => (
//                     <TextField
//                         {...field}
//                         {...other}
//                         variant="standard"
//                     />
//                 )}
//             />
//         )
//     }
//
//     return RHFTextField
// }