//
//  HealthInfo.swift
//  HealthApp
//
//  Created by Just1and0 on 01/03/2024.
//

import Foundation
import HealthKit

@objc(HealthInfo)
class HealthInfo: NSObject {
    let healthStore = HKHealthStore()
    private var isPermissionGranted: Bool = false
    
    @objc
    func updatePermissions() {
        isPermissionGranted = true
    }
    
    @objc
    func authorizeHealthKit(_ callback: @escaping RCTResponseSenderBlock) {
        requestHealthKitPermissions { (authorizationGranted) in
            if authorizationGranted {
                let readTypes: Set<HKSampleType> = [
                    HKObjectType.quantityType(forIdentifier: .heartRate)!,
                    HKObjectType.quantityType(forIdentifier: .bloodPressureSystolic)!,
                    HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
                    HKObjectType.quantityType(forIdentifier: .bodyTemperature)!
                ]
                let shareTypes: Set<HKSampleType> = [
                    HKObjectType.quantityType(forIdentifier: .heartRate)!,
                    HKObjectType.quantityType(forIdentifier: .bloodPressureSystolic)!,
                    HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
                    HKObjectType.quantityType(forIdentifier: .bodyTemperature)!
                ]
                
                let allTypes = Set<HKSampleType>(readTypes.union(shareTypes))
                
                let unauthorizedTypes = allTypes.filter { type in
                    self.healthStore.authorizationStatus(for: type) != .sharingAuthorized
                }
                
                if unauthorizedTypes.isEmpty {
                    // All types were granted permission
                    self.updatePermissions()
                    callback([true])
                } else {
                    // Not all types were granted permission
                    callback([false])
                }
            } else {
                // Error or permission denied 
                callback([false])
            }
        }
    }
    
    @objc
    func requestHealthKitPermissions(completion: @escaping (Bool) -> Void) {
        let readTypes: Set<HKSampleType> = [
            HKObjectType.quantityType(forIdentifier: .heartRate)!,
            HKObjectType.quantityType(forIdentifier: .bloodPressureSystolic)!,
            HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
            HKObjectType.quantityType(forIdentifier: .bodyTemperature)!
        ]
        let shareTypes: Set<HKSampleType> = [
            HKObjectType.quantityType(forIdentifier: .heartRate)!,
            HKObjectType.quantityType(forIdentifier: .bloodPressureSystolic)!,
            HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
            HKObjectType.quantityType(forIdentifier: .bodyTemperature)!
        ]
        
        let allTypes = Set<HKSampleType>(readTypes.union(shareTypes))
        
        healthStore.requestAuthorization(toShare: allTypes, read: allTypes) { (chk, error) in
            if chk {
                // Authorization process completed, check specific authorization status
                completion(true)
            } else {
                // Authorization process failed
                completion(false)
            }
        }
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
