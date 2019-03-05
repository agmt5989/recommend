import pandas as pd
import numpy as np
import graphlab as gl
import sys
import json


def recommend(user_id, recommendation_no):
    model = gl.load_model('Item_sim_model')
    recommendation_no = int(recommendation_no)
    user_id = int(user_id)
    item_recomm = model.recommend(users=[user_id],k=recommendation_no)

    description = pd.read_csv('description.csv')
    recommendations = item_recomm.to_dataframe()
    recommendations = pd.merge(recommendations, description, on='StockCode')
    recommendations.drop_duplicates('StockCode', inplace=True)
    recommendations = recommendations.reset_index(drop = True)
    recommendations = recommendations.to_json(orient='records')

    test_subset = pd.read_csv('test_subset.csv')
    real_values = test_subset[test_subset['CustomerID']==user_id]
    real_values = pd.merge(real_values, description, on='StockCode')
    real_values.drop_duplicates('StockCode', inplace=True)
    real_values = real_values.reset_index(drop = True)
    real_values = real_values.to_json(orient='records')

    #to_send = {'reco': recommendations, 'real': real_values}
    #return to_send.to_json()
    return (real_values, recommendations)


def run():
    if __name__ == '__main__':
        print("------------------------------")
        user_id = sys.argv[1]
        recommendation_no = sys.argv[2]
        print recommend(user_id, recommendation_no)
        return recommend(user_id, recommendation_no)

run()
