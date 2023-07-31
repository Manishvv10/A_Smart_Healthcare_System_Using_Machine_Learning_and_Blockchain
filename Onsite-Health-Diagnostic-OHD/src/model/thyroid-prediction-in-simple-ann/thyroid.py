# -*- coding: utf-8 -*-
"""
Created on Sat Jan 15 18:50:52 2022

@author: Rohan
"""


from keras.models import Sequential
from tensorflow.keras.layers import Dense,Dropout
from tensorflow.keras.optimizers import Adam
from keras.callbacks import EarlyStopping,ReduceLROnPlateau,CSVLogger,ModelCheckpoint
import pandas as pd


data=pd.read_csv("C:\\Users\\Manish\\Desktop\\Project Final\\CNN\\Onsite-Health-Diagnostic-OHD\\src\\model\\thyroid-prediction-in-simple-ann\\thyroid.py")
print(data.head())

print(data.isna().sum())
data.sex=data.sex.fillna(0)
print(data.head())

x=data.drop("binaryClass",axis=1)
y=data.binaryClass

from sklearn.model_selection import train_test_split
x_train,x_test,y_train,y_test=train_test_split(x,y,random_state=0,test_size=0.2)

print("x_train::{}".format(x_train.shape))
print("x_test::{}".format(x_test.shape))
print("y_train::{}".format(y_train.shape))
print("y_test::{}".format(y_test.shape))

from sklearn.preprocessing import StandardScaler
sc=StandardScaler()
x_train=sc.fit_transform(x_train)
x_test=sc.transform(x_test)


model=Sequential()
model.add(Dense(256,input_shape=[x.shape[1]],activation="relu"))
model.add(Dropout(0.4))
model.add(Dense(128,activation="relu"))
model.add(Dropout(0.3))
model.add(Dense(64,activation="relu"))
model.add(Dropout(0.2))
model.add(Dense(1,activation="sigmoid"))
print(model.summary())

model.compile(optimizer=Adam(),loss="binary_crossentropy",metrics=["accuracy"])


lrd = ReduceLROnPlateau(monitor = 'val_loss',patience = 20,verbose = 1,factor = 0.75,min_lr = 1e-10)
checkpoint=ModelCheckpoint("thyroid.h5",monitor='val_acc',verbose=1,save_best_only=True,mode="max")
early_stop=EarlyStopping(verbose=1,patience=20)
log_csv=CSVLogger("thyroid.csv",separator=",",append=False)


callback_list=[checkpoint,early_stop,log_csv,lrd]

model_main=model.fit(x=x_train,y=y_train,epochs=100,callbacks=callback_list, batch_size=64, validation_split=0.1)

print(model.evaluate(x_test,y_test))

y_pred=model.predict(x_test)
print(y_pred)

print(y_test)

print(y_pred[2])

from keras.models import load_model
model.save("thyroid.h5")

model=load_model("thyroid.h5")
model.predict(sc.transform([[42.1,0,0,0,0,0,0,0,12,34,43,0,0,0,0,0,1.00,132,1.00,1.00,109.0,1.0,0.88,.100,110.00,0.00,0,1]]))
