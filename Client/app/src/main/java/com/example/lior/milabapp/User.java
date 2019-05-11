package com.example.lior.milabapp;

import android.graphics.drawable.Drawable;

public class User {
    int id = 0;
    String name = null;
    Drawable image = null;
    boolean trust = false;

    public User(int id, String name, Drawable profile_pic, boolean trust) {
        this.id = id;
        this.name = name;
        this.image = profile_pic;
        this.trust = trust;
    }

    public void setTrust (boolean trust) {
        this.trust = trust;
    }

    public boolean getTrust () {
        return this.trust;
    }

    public void setImage (Drawable profile_pic){
        this.image = profile_pic;
    }
    public Drawable getImage (){
        return this.image;
    }

    public void setId (int new_id){
        this.id = new_id;
    }

    public int getId (){
        return this.id;
    }

    public void setName (int new_id){
        this.id = new_id;
    }

    public String getName (){
        return this.name;
    }



}
