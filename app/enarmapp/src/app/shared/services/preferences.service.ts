import { Injectable } from "@angular/core"
import { has, isNull } from 'lodash'

@Injectable({
    providedIn: 'root'
})
export class PreferencesService{

    getItem<T> (itemName: string) {
        try {
          const itemValue = localStorage.getItem(itemName) as string
          if ( !isNull(itemValue)) {
            return JSON.parse(itemValue)
          } else {
            return undefined
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      setItem<T> (itemName: string, itemValue: T): boolean {
        localStorage.setItem(itemName, JSON.stringify(itemValue) )
        return true
      }
    
      removeItem (itemName: string): boolean {
        localStorage.removeItem(itemName)
        return true
      }
    
      clearAllItems (): boolean {
        localStorage.clear()
        return true
      }
}

