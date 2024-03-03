//
//  HealthInfo.m
//  HealthApp
//
//  Created by Just1and0 on 01/03/2024.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(HealthInfo, NSObject)

RCT_EXTERN_METHOD(authorizeHealthKit:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getHeartRate:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getBodyTemperature:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getOxygenSaturation:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getBloodPressureSystolic:(RCTResponseSenderBlock)callback)
@end
