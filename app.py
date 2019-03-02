import numpy as np
from sklearn.externals import joblib
from sklearn.base import BaseEstimator, TransformerMixin
from skimage.feature import hog
from keras.preprocessing import image
from PIL import ImageFile  
import sys
from sklearn.preprocessing import StandardScaler
import skimage


def path_to_tensor(img_path):
    # loads RGB image as PIL.Image.Image type
    img = image.load_img(img_path, target_size=(299, 299))
    # convert PIL.Image.Image type to 3D tensor with shape (299, 299, 3)
    x = image.img_to_array(img)
    # convert 3D tensor to 4D tensor with shape (1, 299, 299, 3) and return 4D tensor
    return np.expand_dims(x, axis=0)


class RGB2GrayTransformer(BaseEstimator, TransformerMixin):
    """
    Convert an array of RGB images to grayscale
    """

    def __init__(self):
        pass

    def fit(self, X, y=None):
        """returns itself"""
        return self

    def transform(self, X, y=None):
        """perform the transformation and return an array"""
        return np.array([skimage.color.rgb2gray(img) for img in X])


class HogTransformer(BaseEstimator, TransformerMixin):
    """
    Expects an array of 2d arrays (1 channel images)
    Calculates hog features for each img
    """

    def __init__(self, y=None, orientations=9,
                 pixels_per_cell=(8, 8),
                 cells_per_block=(3, 3), block_norm='L2-Hys'):
        self.y = y
        self.orientations = orientations
        self.pixels_per_cell = pixels_per_cell
        self.cells_per_block = cells_per_block
        self.block_norm = block_norm

    def fit(self, X, y=None):
        return self

    def transform(self, X, y=None):

        def local_hog(X):
            return hog(X,
                       orientations=self.orientations,
                       pixels_per_cell=self.pixels_per_cell,
                       cells_per_block=self.cells_per_block,
                       block_norm=self.block_norm)

        try: # parallel
            return np.array([local_hog(img) for img in X])
        except:
            return np.array([local_hog(img) for img in X])

def get_features(filename):
    ImageFile.LOAD_TRUNCATED_IMAGES = True                 
    # pre-process the train data for Keras
    train_tensors = path_to_tensor(filename).astype('float32')
    grayify = RGB2GrayTransformer()
    hogify = HogTransformer(
                pixels_per_cell=(8, 8),
                cells_per_block=(2,2),
                orientations=9,
                block_norm='L2-Hys'
                )
    scaler_file = '/home/cslab/imyke/dorcas/Scaler1.sav'
    scale = joblib.load(scaler_file)

    # call fit_transform on each transform converting X_train step by step
    X_train_gray = grayify.fit_transform(train_tensors)
    X_train_hog = hogify.fit_transform(X_train_gray)
    X_train_prepared = scale.transform(X_train_hog)
    return X_train_prepared


def get_note(resp):
    denom_mapping = {0: 'Fifty Naira Note', 1: 'Five Naira Note', 2: 'Five Hundred Naira Note', 3: 'Hundred Naira Note' ,
                     4: 'One Thousand Naira Note',
                     5: 'Ten Naira Note', 6:'Twenty Naira Note' , 7:'Two Hundred Naira Note'}

    return denom_mapping.get(resp)

def predict_currency(image_path):
    modelfile = '/home/cslab/imyke/dorcas/finalized_model4.sav'
    model = joblib.load(modelfile)
    image = get_features(image_path)
    resp = model.predict(image)
    return resp[0]

   

if __name__ == '__main__':
    print("------------------------------")
    image_path = sys.argv[1]
    print(get_note(predict_currency(image_path)))
