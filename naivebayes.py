import sys
import numpy as np
import csv
from os.path import join
import os 

# Gaussian Naive Bayes
from sklearn.naive_bayes import GaussianNB


def load_data(cwd, data_file_name):
    with open(join(cwd, 'upload', data_file_name)) as csv_file:
        data_file = csv.reader(csv_file)
        temp = next(data_file)
        n_samples = int(temp[0])
        n_features = int(temp[1])
        temp = next(data_file)
        names = np.array(temp)
        data = np.empty((n_samples, n_features))
        labels = np.empty((n_samples,), dtype=np.int64)

        for i, ir in enumerate(data_file):
            data[i] = np.asarray(ir[:-1], dtype=np.float64)
            labels[i] = np.asarray(ir[-1], dtype=np.int64)

    return data, labels, names


# command line arguments
filename = sys.argv[1]

#current working directory
cwd = os.getcwd()

# load the trained datasets 
data, target_labels, target_names = load_data(cwd, 'trained_soil_data.csv')

# load the test datasets
test_data, test_labels, test_names = load_data(cwd,filename)

# fit a Naive Bayes model to the data
model = GaussianNB()
model.fit(data, target_labels)

# make predictions
predicted = model.predict(test_data)

print(predicted)
