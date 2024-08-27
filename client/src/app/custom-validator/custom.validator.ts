import { AbstractControl, FormControl } from "@angular/forms";

export class CustomVlidators {
    static noSpaceAllowed(control: FormControl) {
        if (control.value !== "" && control.value.indexOf(' ') !== -1) {
            return { noSpaceAllowed: true }
        }
        return null
    }

    static passwordMissMatch(control: AbstractControl) {
        const password = control.get('password')?.value
        const cpassword = control.get('cpassword')?.value

        if (password !== cpassword) {
            return { passwordMissMatch: true }
        }
        return null
    }
}