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
  func getHealthData(_ sampleType: HKSampleType, unit: String, name: String, callback: @escaping RCTResponseSenderBlock) {
      let startDate = Calendar.current.date(byAdding: .month, value: -1, to: Date())
      let predicate = HKQuery.predicateForSamples(withStart: startDate, end: Date(), options: .strictEndDate)
      let sortDescriptor = NSSortDescriptor(key: HKSampleSortIdentifierStartDate, ascending: false)

      let query = HKSampleQuery(sampleType: sampleType, predicate: predicate, limit: Int(HKObjectQueryNoLimit), sortDescriptors: [sortDescriptor]) { (sample, result, error) in
          guard error == nil else {
              return
          }

          var healthData: [String: Any] = ["status": false]

          if let result = result, result.count > 0 {
              let data = result[0] as! HKQuantitySample
              let value = data.quantity.doubleValue(for: HKUnit(from: unit))
              print("Latest Value \(value)")

              let dateFormatter = DateFormatter()
              dateFormatter.dateFormat = "dd/MM/yyyy"
              let startDate = dateFormatter.string(from: data.startDate)
              let endDate = dateFormatter.string(from: data.endDate)

              healthData = [
                  "name": name,
                  "status": true,
                  "latestValue": value,
                  "unit": unit,
                  "recordDuration": "\(startDate) - \(endDate)"
              ]
          }

          callback([healthData])
      }

      healthStore.execute(query)
  }

  @objc
  func getHeartRate(_ callback: @escaping RCTResponseSenderBlock) {
      guard let Type = HKObjectType.quantityType(forIdentifier: .heartRate) else {
          return
      }
     getHealthData(Type, unit: "count/min", name:"Heart Rate", callback: callback)
  }
  
  @objc
  func getBodyTemperature(_ callback: @escaping RCTResponseSenderBlock) {
      guard let Type = HKObjectType.quantityType(forIdentifier: .bodyTemperature) else {
          return
      }
    getHealthData(Type, unit: "degC", name:"Body Temperature", callback: callback)
  }
  
  @objc
  func getOxygenSaturation(_ callback: @escaping RCTResponseSenderBlock) {
      guard let Type = HKObjectType.quantityType(forIdentifier: .oxygenSaturation) else {
          return
      }
      getHealthData(Type, unit: "%",name:"Oxygen Saturation", callback: callback)
  }
  
  @objc
  func getBloodPressureSystolic(_ callback: @escaping RCTResponseSenderBlock) {
      guard let Type = HKObjectType.quantityType(forIdentifier: .bloodPressureSystolic) else {
          return
      }
      getHealthData(Type, unit: "mmHg", name:"Blood Pressure Systolic", callback: callback)
  }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
